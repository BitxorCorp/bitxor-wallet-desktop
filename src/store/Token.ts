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
import Vue from 'vue';
import { AccountInfo, Address, TokenId, RepositoryFactory } from 'bitxor-sdk';
// internal dependencies
import { AwaitLock } from './AwaitLock';
import { TokenService } from '@/services/TokenService';
import { NetworkCurrencyModel } from '@/core/database/entities/NetworkCurrencyModel';
import { TokenModel } from '@/core/database/entities/TokenModel';
import { TokenConfigurationModel } from '@/core/database/entities/TokenConfigurationModel';
import { first, tap } from 'rxjs/operators';
import { MetadataModel } from '@/core/database/entities/MetadataModel';
import { MetadataService } from '@/services/MetadataService';

const Lock = AwaitLock.create();

// token state typing
interface TokenState {
    initialized: boolean;
    networkCurrency: NetworkCurrencyModel;
    tokens: TokenModel[];
    balanceTokens: TokenModel[];
    holdTokens: TokenModel[];
    ownedTokens: TokenModel[];
    networkTokenId: TokenId;
    networkTokenName: string;
    networkTokenTicker: string;
    accountTokenConfigurations: Record<string, TokenConfigurationModel>;
    isFetchingTokens: boolean;
}

// token state initial definition
const tokenState: TokenState = {
    initialized: false,
    networkTokenId: null,
    tokens: [],
    balanceTokens: [],
    holdTokens: [],
    ownedTokens: [],
    networkCurrency: null,
    networkTokenName: '',
    networkTokenTicker: '',
    accountTokenConfigurations: {},
    isFetchingTokens: false,
};

export default {
    namespaced: true,
    state: tokenState,
    getters: {
        getInitialized: (state: TokenState) => state.initialized,
        networkCurrency: (state: TokenState) => state.networkCurrency,
        tokens: (state: TokenState) => state.tokens,
        ownedTokens: (state: TokenState) => state.ownedTokens,
        holdTokens: (state: TokenState) => state.holdTokens,
        balanceTokens: (state: TokenState) => state.balanceTokens,
        networkToken: (state: TokenState) => state.networkTokenId,
        networkTokenTicker: (state: TokenState) => state.networkTokenTicker,
        accountTokenConfigurations: (state: TokenState) => state.accountTokenConfigurations,
        networkTokenName: (state: TokenState) => state.networkTokenName,
        isFetchingTokens: (state: TokenState) => state.isFetchingTokens,
        networkBalanceTokens: (state: TokenState) => state.balanceTokens.find((m) => m.tokenIdHex === state.networkTokenId.toHex()),
    },
    mutations: {
        setInitialized: (state: TokenState, initialized: boolean) => {
            state.initialized = initialized;
        },
        networkCurrency: (state: TokenState, networkCurrency: NetworkCurrencyModel) => {
            Vue.set(state, 'networkCurrency', networkCurrency);
            Vue.set(state, 'networkTokenId', new TokenId(networkCurrency.tokenIdHex));
            Vue.set(state, 'networkTokenName', networkCurrency.namespaceIdFullname);
            Vue.set(state, 'networkTokenTicker', networkCurrency.ticker);
        },
        tokens: (
            state: TokenState,
            {
                tokens,
                currentSignerAddress,
                networkCurrency,
                tokenMetadataList,
            }: {
                tokens: TokenModel[];
                currentSignerAddress: Address;
                networkCurrency: NetworkCurrencyModel;
                tokenMetadataList: MetadataModel[];
            },
        ) => {
            const uniqueTokens = tokens.map((token) => {
                token.metadataList = MetadataService.getTokenMetadataByTargetId(tokenMetadataList, token.tokenIdHex);
                return token;
            });
            const ownedTokens = uniqueTokens.filter(
                (m) => m.ownerRawPlain === currentSignerAddress.plain() && m.addressRawPlain === currentSignerAddress.plain(),
            );

            let holdTokens = uniqueTokens
                .filter((m) => m.addressRawPlain === currentSignerAddress.plain())
                .sort((m1, m2) => {
                    const owner1 = m1.ownerRawPlain === currentSignerAddress.plain();
                    const owner2 = m2.ownerRawPlain === currentSignerAddress.plain();
                    return Number(owner1) - Number(owner2);
                });
            holdTokens = holdTokens.sort((item) => (item.tokenIdHex.indexOf('3D1FE6EDC7F9611E') !== -1 ? -1 : 1));

            const noToken = networkCurrency && !holdTokens.find((m) => m.isCurrencyToken);

            const balanceTokens = (noToken
                ? [
                      {
                          tokenIdHex: networkCurrency.tokenIdHex,
                          divisibility: networkCurrency.divisibility,
                          name: networkCurrency.namespaceIdFullname,
                          isCurrencyToken: true,
                          balance: 0,
                      } as TokenModel,
                      ...holdTokens,
                  ]
                : [...holdTokens]
            ).filter((m) => m.isCurrencyToken || m.balance > 0);
            Vue.set(state, 'tokens', uniqueTokens);
            Vue.set(state, 'balanceTokens', balanceTokens);
            Vue.set(state, 'ownedTokens', ownedTokens);
            Vue.set(
                state,
                'holdTokens',
                holdTokens.filter((m) => m.ownerRawPlain === currentSignerAddress.plain() || m.balance > 0),
            );
        },
        accountTokenConfigurations: (state: TokenState, accountTokenConfigurations: Record<string, TokenConfigurationModel>) =>
            Vue.set(state, 'accountTokenConfigurations', accountTokenConfigurations),

        isFetchingTokens: (state: TokenState, isFetchingTokens: boolean) => Vue.set(state, 'isFetchingTokens', isFetchingTokens),
    },
    actions: {
        async initialize({ commit, getters }) {
            const callback = async () => {
                commit('setInitialized', true);
            };
            // acquire async lock until initialized
            await Lock.initialize(callback, { getters });
        },
        async uninitialize({ commit, getters }) {
            const callback = async () => {
                commit('setInitialized', false);
            };
            await Lock.uninitialize(callback, { getters });
        },

        async LOAD_NETWORK_CURRENCIES({ commit, rootGetters }) {
            const tokenService = new TokenService();
            const repositoryFactory: RepositoryFactory = rootGetters['network/repositoryFactory'];
            const generationHash: string = rootGetters['network/generationHash'];
            await tokenService
                .getNetworkCurrencies(repositoryFactory, generationHash)
                .pipe(
                    tap((networkCurrencies) => {
                        commit('networkCurrency', networkCurrencies.networkCurrency);
                    }),
                    first(),
                )
                .toPromise();
        },

        async LOAD_TOKENS({ commit, rootGetters }) {
            const repositoryFactory: RepositoryFactory = rootGetters['network/repositoryFactory'];
            const networkCurrency: NetworkCurrencyModel = rootGetters['token/networkCurrency'];
            const accountsInfo: AccountInfo[] = rootGetters['account/accountsInfo'] || [];
            const generationHash = rootGetters['network/generationHash'];
            const tokenMetadataList: MetadataModel[] = rootGetters['metadata/tokenMetadataList'];
            const currentSignerAddress: Address = rootGetters['account/currentSignerAddress'];
            if (!repositoryFactory) {
                return;
            }
            commit('isFetchingTokens', true);

            (await new TokenService().getTokens(repositoryFactory, generationHash, networkCurrency, accountsInfo, currentSignerAddress))
                .subscribe((tokens) => {
                    if (!currentSignerAddress) {
                        return;
                    }
                    commit('tokens', {
                        tokens: tokens,
                        currentSignerAddress,
                        networkCurrency,
                        tokenMetadataList,
                    });
                })
                .add(() => commit('isFetchingTokens', false));
        },

        RESET_TOKENS({ commit, rootGetters }) {
            const networkCurrency: NetworkCurrencyModel = rootGetters['token/networkCurrency'];
            commit('tokens', { tokens: [], undefined, networkCurrency });
        },

        SIGNER_CHANGED({ commit, rootGetters, getters }) {
            const currentSignerAddress: Address = rootGetters['account/currentSignerAddress'];
            const networkCurrency: NetworkCurrencyModel = rootGetters['token/networkCurrency'];
            if (!currentSignerAddress) {
                return;
            }
            const tokenService = new TokenService();
            commit('accountTokenConfigurations', tokenService.getTokenConfigurationsByAccount(rootGetters['account/currentAccount']));
            commit('tokens', {
                tokens: getters['tokens'],
                currentSignerAddress,
                networkCurrency,
            });
        },

        HIDE_TOKEN({ commit }, { tokenId, account }) {
            commit(
                'accountTokenConfigurations',
                new TokenService().changeTokenConfiguration(tokenId, account, {
                    hidden: true,
                }),
            );
        },
        SHOW_TOKEN({ commit }, { tokenId, account }) {
            commit(
                'accountTokenConfigurations',
                new TokenService().changeTokenConfiguration(tokenId, account, {
                    hidden: false,
                }),
            );
        },
    },
};
