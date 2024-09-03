/*
 * (C) Bitxor Community 2022
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */
// external dependencies
import _ from 'lodash';
import { AccountInfo, Address, Currency, TokenId, TokenInfo, TokenNames, NamespaceId, RepositoryFactory, UInt64 } from 'bitxor-sdk';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, mergeMap, tap, toArray } from 'rxjs/operators';
// internal dependencies
import { TokenConfigurationModel, AccountTokenConfigurationModel } from '@/core/database/entities/TokenConfigurationModel';
import { TokenModel } from '@/core/database/entities/TokenModel';
import { NetworkCurrencyModel } from '@/core/database/entities/NetworkCurrencyModel';
import { ObservableHelpers } from '@/core/utils/ObservableHelpers';
import { RESTService } from '@/services/RESTService';
import { TimeHelpers } from '@/core/utils/TimeHelpers';
import { NetworkCurrenciesModel } from '@/core/database/entities/NetworkCurrenciesModel';
import { TokenModelStorage } from '@/core/database/storage/TokenModelStorage';
import { NetworkCurrenciesModelStorage } from '@/core/database/storage/NetworkCurrenciesModelStorage';
import { TokenConfigurationModelStorage } from '@/core/database/storage/TokenConfigurationModelStorage';
import { AccountModel } from '@/core/database/entities/AccountModel';

// custom types
export type ExpirationStatus = 'unlimited' | 'expired' | string | number;

// TODO. Can this interface be removed?
export interface AttachedToken {
    id: TokenId | NamespaceId;
    tokenHex: string;
    /**
     * Relative amount
     */
    amount: number;
}

interface TokenBalance {
    tokenId: TokenId;
    amount: UInt64;
    address: Address;
}

/**
 * The service in charge of loading and caching anything related to Tokens from Rest.
 * The cache is done by storing the payloads in SimpleObjectStorage.
 *
 * The service also holds configuration about the current tokens, for example which token
 * balances are currently hidden.
 */
export class TokenService {
    /**
     * Store that caches the token information of the current accounts when returned from rest.
     */
    private readonly tokenDataStorage = TokenModelStorage.INSTANCE;

    /**
     * The storage to keep user configuration around tokens.  For example, the balance hidden
     * feature.
     */
    private readonly tokenConfigurationsStorage = TokenConfigurationModelStorage.INSTANCE;

    /**
     * Store that caches the information around the network currency.
     */
    private readonly networkCurrencyStorage = NetworkCurrenciesModelStorage.INSTANCE;

    /**
     * This method loads and caches the token information for the given accounts.
     * The returned Observable will announce the cached information first, then the rest returned
     * information (if possible).
     *
     * @param {RepositoryFactory} repositoryFactory
     * @param {string} generationHash
     * @param {NetworkCurrencyModel} networkCurrency
     * @param {AccountInfo[]} accountsInfo
     * @returns {Observable<TokenModel[]>}
     */
    public async getTokens(
        repositoryFactory: RepositoryFactory,
        generationHash: string,
        networkCurrency: NetworkCurrencyModel,
        accountsInfo: AccountInfo[],
        ownerAddress: Address,
    ): Promise<Observable<TokenModel[]>> {
        if (!accountsInfo.length) {
            return of([]);
        }
        const tokenDataList = this.loadTokenData(generationHash) || [];
        const resolvedBalancesObservable = this.resolveBalances(repositoryFactory, accountsInfo);
        const accountAddresses = accountsInfo.map((a) => a.address);
        const tokensFromAccountsObservable = repositoryFactory.createTokenRepository().search({ ownerAddress });
        const numberprice = await RESTService.getTokens();
        return combineLatest([resolvedBalancesObservable, tokensFromAccountsObservable])
            .pipe(
                mergeMap(([balances, owedTokens]) => {
                    const tokenIds: TokenId[] = _.uniqBy([...balances.map((m) => m.tokenId), ...owedTokens.data.map((o) => o.id)], (m) =>
                        m.toHex(),
                    );
                    const nameObservables = repositoryFactory.createNamespaceRepository().getTokensNames(tokenIds);
                    const tokenInfoObservable = this.loadToken(repositoryFactory, tokenIds, owedTokens.data);

                    return combineLatest([nameObservables, tokenInfoObservable]).pipe(
                        map(([names, tokenInfos]) => {
                            return this.toTokenDtos(balances, tokenInfos, names, networkCurrency, accountAddresses, numberprice);
                        }),
                    );
                }),
            )
            .pipe(
                tap((d) => this.saveTokenData(generationHash, d)),
                ObservableHelpers.defaultFirst(tokenDataList),
            );
    }

    private loadToken(
        repositoryFactory: RepositoryFactory,
        tokenIds: TokenId[],
        alreadyLoadedTokens: TokenInfo[],
    ): Observable<TokenInfo[]> {
        const toLoadTokenIds = tokenIds.filter((tokenId) => !alreadyLoadedTokens.some((info) => info.id.equals(tokenId)));
        if (toLoadTokenIds.length) {
            return repositoryFactory
                .createTokenRepository()
                .getTokens(toLoadTokenIds)
                .pipe(map((newTokens) => newTokens.concat(alreadyLoadedTokens)));
        } else {
            return of(alreadyLoadedTokens);
        }
    }

    private getName(tokenNames: TokenNames[], accountTokenDto: TokenId): string {
        return _.first(
            tokenNames
                .filter((n) => n.tokenId.equals(accountTokenDto))
                .filter((n) => n.names.length)
                .map((n) => n.names[0].name),
        );
    }
    public static async getprice(idtoken: string) {
        return (await RESTService.getPrefixToken(idtoken))
            ? await RESTService.getPrice(await RESTService.getPrefixToken(idtoken), 'USD')
            : 0;
    }
    private toTokenDtos(
        balances: TokenBalance[],
        tokenDtos: TokenInfo[],
        tokenNames: TokenNames[],
        networkCurrency: NetworkCurrencyModel,
        accountAddresses: Address[],
        prices: any,
    ): TokenModel[] {
        return _.flatten(
            accountAddresses.map((address) => {
                return tokenDtos.map((tokenDto) => {
                    const name = this.getName(tokenNames, tokenDto.id);
                    const isCurrencyToken = tokenDto.id.toHex() === networkCurrency.tokenIdHex;
                    const balance = balances.find((balance) => balance.tokenId.equals(tokenDto.id) && balance.address.equals(address));
                    const index = prices ? prices.map((o) => o.tokenid).indexOf(tokenDto.id.toHex().toUpperCase()) : -1;
                    if (index !== -1) {
                        return new TokenModel(
                            address.plain(),
                            tokenDto.ownerAddress.plain(),
                            prices[index].name,
                            isCurrencyToken,
                            (balance && balance.amount.compact()) || 0,
                            tokenDto,
                            prices[index].price,
                        );
                    } else {
                        return new TokenModel(
                            address.plain(),
                            tokenDto.ownerAddress.plain(),
                            name,
                            isCurrencyToken,
                            (balance && balance.amount.compact()) || 0,
                            tokenDto,
                            0,
                        );
                    }
                });
            }),
        );
    }

    private resolveBalances(repositoryFactory: RepositoryFactory, accountsInfo: AccountInfo[]): Observable<TokenBalance[]> {
        const tokenIdOrAliases = _.flatten(accountsInfo.map((a) => a.tokens.map((m) => m.id)));
        const tokenIdOrAliasesUnique = _.uniqBy(tokenIdOrAliases, (m) => m.toHex());
        return this.resolveTokenIds(repositoryFactory, tokenIdOrAliasesUnique).pipe(
            map((resolveTokenIds) => {
                return _.flatten(
                    accountsInfo.map((a) => {
                        return a.tokens.map((m) => {
                            return {
                                address: a.address,
                                amount: m.amount,
                                tokenId: resolveTokenIds.find((pair) => pair.from.equals(m.id)).to,
                            };
                        });
                    }),
                );
            }),
        );
    }

    private resolveTokenIds(
        repositoryFactory: RepositoryFactory,
        ids: (NamespaceId | TokenId)[],
    ): Observable<{ from: NamespaceId | TokenId; to: TokenId }[]> {
        const namespaceRepository = repositoryFactory.createNamespaceRepository();
        return from(ids)
            .pipe(
                mergeMap((id) => {
                    if (id instanceof TokenId) {
                        return of({ from: id, to: id as TokenId });
                    } else {
                        const linkedTokenIdObservable = namespaceRepository.getLinkedTokenId(id as NamespaceId);
                        return linkedTokenIdObservable.pipe(
                            map((to) => {
                                return { from: id, to: to };
                            }),
                        );
                    }
                }),
            )
            .pipe(toArray());
    }

    /**
     * This method returns the list of {@link NetworkCurrencyModel} of the network.
     *
     * The intent of this method is to resolve the configured main (like cat.currency or bitxor)
     * and harvest currencies (cat.harvest) returned by the network configuration endpoint.
     *
     * @param {RepositoryFactory} repositoryFactory
     * @param {generationHash} the generation hash.
     * @returns {Observable<NetworkCurrencyModel[]>}
     */
    public getNetworkCurrencies(repositoryFactory: RepositoryFactory, generationHash: string): Observable<NetworkCurrenciesModel> {
        return repositoryFactory.getCurrencies().pipe(
            map((networkTokens) => {
                const currency = this.getNetworkCurrency(networkTokens.currency);
                const harvest = this.getNetworkCurrency(networkTokens.harvest);
                return new NetworkCurrenciesModel(currency, harvest);
            }),
            tap((d) => this.networkCurrencyStorage.set(generationHash, d)),
        );
    }

    private loadTokenData(generationHash: string): TokenModel[] {
        return this.tokenDataStorage.get(generationHash);
    }

    private saveTokenData(generationHash: string, tokens: TokenModel[]) {
        this.tokenDataStorage.set(generationHash, tokens);
    }

    public reset(generationHash: string) {
        this.tokenDataStorage.remove(generationHash);
        this.networkCurrencyStorage.remove(generationHash);
    }

    /**
     * Creates a network currency model given token info and token names
     * @param {TokenInfo} tokenInfo
     * @param {TokenNames} tokenName
     * @returns {(NetworkCurrencyModel | undefined)}
     */
    private getNetworkCurrency(currency: Currency): NetworkCurrencyModel {
        const tokenId = currency.tokenId;
        const namespaceId = currency.namespaceId;
        const ticker = (namespaceId && namespaceId.fullName && namespaceId.fullName.split('.').pop().toUpperCase()) || undefined;
        return new NetworkCurrencyModel(
            tokenId?.toHex(),
            namespaceId?.toHex(),
            namespaceId.fullName,
            currency.divisibility,
            currency.transferable,
            currency.supplyMutable,
            currency.restrictable,
            ticker,
        );
    }

    /**
     *
     * Utility method that returns the token expiration status
     * @param tokenInfo the token info
     * @param currentHeight
     * @param blockGenerationTargetTime
     */
    public static getExpiration(tokenInfo: TokenModel, currentHeight: number, blockGenerationTargetTime: number): ExpirationStatus {
        const duration = tokenInfo.duration;
        const startHeight = tokenInfo.height;

        // unlimited duration tokens are flagged as duration == 0
        if (duration === 0) {
            return 'unlimited';
        }

        // get current height
        // calculate expiration
        const expiresIn = startHeight + duration - (currentHeight || 0);
        if (expiresIn <= 0) {
            return 'expired';
        }
        // number of blocks remaining
        return TimeHelpers.durationToRelativeTime(expiresIn, blockGenerationTargetTime);
    }

    public getTokenConfigurationsByAccount(account: AccountModel): AccountTokenConfigurationModel {
        return this.getTokenConfigurations()[account.id] || {};
    }

    public getTokenConfiguration(tokenId: TokenId, account: AccountModel): TokenConfigurationModel {
        return this.getTokenConfigurationsByAccount(account)[tokenId.toHex()] || new TokenConfigurationModel();
    }
    public getTokenConfigurations(): Record<string, AccountTokenConfigurationModel> {
        return this.tokenConfigurationsStorage.get() || {};
    }
    public changeTokenConfiguration(tokenId: TokenId, account: AccountModel, newConfigs: any): Record<string, TokenConfigurationModel> {
        const tokenConfigurationsStorage = this.getTokenConfigurations();
        tokenConfigurationsStorage[account.id] = tokenConfigurationsStorage[account.id] ? tokenConfigurationsStorage[account.id] : {};
        tokenConfigurationsStorage[account.id][tokenId.toHex()] = {
            ...this.getTokenConfiguration(tokenId, account),
            ...newConfigs,
        };
        this.tokenConfigurationsStorage.set(tokenConfigurationsStorage);
        return tokenConfigurationsStorage[account.id];
    }
}
