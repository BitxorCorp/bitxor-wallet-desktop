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
import {
    AccountInfo,
    AccountRepository,
    Address,
    TokenFlags,
    TokenId,
    TokenInfo,
    TokenRepository,
    NetworkCurrencies,
    NetworkType,
    Page,
    RepositoryFactory,
    UInt64,
} from 'bitxor-sdk';
import { TokenService } from '@/services/TokenService';
import { of } from 'rxjs';
import { anything, deepEqual, instance, mock, when } from 'ts-mockito';

const fakeTokenInfo = new TokenInfo(
    1,
    '59FDA0733F17CF0001772CBC',
    new TokenId([3646934825, 3576016193]),
    new UInt64([3403414400, 2095475]),
    new UInt64([1, 0]),
    Address.createFromRawAddress('TAD5BAHLOIXCRRB6GU2H72HPXMBBVAEUQRYPHBY'),
    1,
    new TokenFlags(7),
    3,
    UInt64.fromNumericString('1000'),
);

const address1 = Address.createFromRawAddress('TAD5BAHLOIXCRRB6GU2H72HPXMBBVAEUQRYPHBY');
const accountInfo1 = { address: address1, tokens: [{ id: fakeTokenInfo.id, amount: UInt64.fromUint(10) }] } as AccountInfo;

const address2 = Address.createFromRawAddress('TAWJ2M7BGKWGBPOUGD5NDKHYDDQ7OQD26HJMMQQ');
const accountInfo2 = { address: address2, tokens: [{ id: fakeTokenInfo.id, amount: UInt64.fromUint(20) }] } as AccountInfo;

const address3 = Address.createFromRawAddress('TDARSPFSZVLYGBOHGOVWIKAZ4FGGDPGZ3DSS7CQ');
const accountInfo3 = { address: address3, tokens: [{ id: fakeTokenInfo.id, amount: UInt64.fromUint(30) }] } as AccountInfo;

const address4 = Address.createFromRawAddress('TCEPWMC37ZGXOGOXQOAGDYPI7YH65HLXIMLKNOQ');
const accountInfo4 = { address: address4, tokens: [{ id: fakeTokenInfo.id, amount: UInt64.fromUint(40) }] } as AccountInfo;

const address5 = Address.createFromRawAddress('TAUDGSA7IEFH6MRGXO26SUU3W5ICF7OLLI3O7CY');
const accountInfo5 = { address: address5, tokens: [{ id: fakeTokenInfo.id, amount: UInt64.fromUint(50) }] } as AccountInfo;

const tokenService = new TokenService();

const mockRepoFactory = mock<RepositoryFactory>();

const mockTokenRepository = mock<TokenRepository>();
when(mockTokenRepository.getToken(anything())).thenReturn(of(fakeTokenInfo));
when(mockTokenRepository.getTokens(anything())).thenReturn(of([fakeTokenInfo]));
when(mockTokenRepository.search(anything())).thenReturn(of(new Page([fakeTokenInfo], 1, 1)));

const tokenRepository = instance(mockTokenRepository);
const mockAccountRepository = mock<AccountRepository>();

when(mockAccountRepository.getAccountsInfo(deepEqual([address1, address2, address3, address4, address5]))).thenReturn(
    of([accountInfo1, accountInfo2, accountInfo3, accountInfo4, accountInfo5]),
);

when(mockAccountRepository.getAccountsInfo(deepEqual([address1]))).thenReturn(of([accountInfo1]));
when(mockAccountRepository.getAccountsInfo(deepEqual([address3]))).thenReturn(of([accountInfo3]));

const accountRepository = instance(mockAccountRepository);
when(mockRepoFactory.createAccountRepository()).thenReturn(accountRepository);
when(mockRepoFactory.createTokenRepository()).thenReturn(tokenRepository);

when(mockRepoFactory.getEpochAdjustment()).thenReturn(of(1573430400));
when(mockRepoFactory.getGenerationHash()).thenReturn(of('Some Gen Hash'));
when(mockRepoFactory.getNetworkType()).thenReturn(of(NetworkType.TEST_NET));
when(mockRepoFactory.getCurrencies()).thenReturn(of(NetworkCurrencies.PUBLIC));
const repositoryFactory = instance(mockRepoFactory);

describe('services/TokenService', () => {
    test('getTokens all addresses', async () => {
        const generationHash = await repositoryFactory.getGenerationHash().toPromise();
        const { networkCurrency } = await tokenService.getNetworkCurrencies(repositoryFactory, generationHash).toPromise();
        const addresses: Address[] = [address1, address2, address3, address4, address5];
        const accountInfos = await repositoryFactory.createAccountRepository().getAccountsInfo(addresses).toPromise();
        const result = await (
            await tokenService.getTokens(repositoryFactory, generationHash, networkCurrency, accountInfos, address1)
        ).toPromise();
        console.log(JSON.stringify(result, null, 2));
    });

    test('getTokens account 1 addresses', async () => {
        const generationHash = await repositoryFactory.getGenerationHash().toPromise();
        const { networkCurrency } = await tokenService.getNetworkCurrencies(repositoryFactory, generationHash).toPromise();
        const addresses: Address[] = [address1];
        const accountInfos = await repositoryFactory.createAccountRepository().getAccountsInfo(addresses).toPromise();
        const result = await (
            await tokenService.getTokens(repositoryFactory, generationHash, networkCurrency, accountInfos, address1)
        ).toPromise();
        console.log(JSON.stringify(result, null, 2));
    });

    test('getTokens account 3 addresses', async () => {
        const generationHash = await repositoryFactory.getGenerationHash().toPromise();
        const { networkCurrency } = await tokenService.getNetworkCurrencies(repositoryFactory, generationHash).toPromise();
        const addresses: Address[] = [address3];
        const accountInfos = await repositoryFactory.createAccountRepository().getAccountsInfo(addresses).toPromise();
        const result = await (
            await tokenService.getTokens(repositoryFactory, generationHash, networkCurrency, accountInfos, address1)
        ).toPromise();
        console.log(JSON.stringify(result, null, 2));
    });
});
