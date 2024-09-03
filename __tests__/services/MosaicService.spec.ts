import { TokenId } from 'bitxor-sdk';
import { AccountModel } from '@/core/database/entities/AccountModel';
import { TokenService } from '@/services/TokenService';
import { tokenConfigurations } from '@MOCKS/TokenConfigurations';

const tokenId = new TokenId('05D6A80DE3C9ADCA');
const account1: AccountModel = {
    address: 'TD2UU6EY4G4WSV5NJMVLVVNRKZOKEZIBYXBFZ4U2',
    encryptedPrivateKey:
        '5730f8e71484dc0cc8ff8a206552080dcbcfc244e1294bf1cc303198561c916ciDHHCOVVjNm3qx5xY6wLXpDjqV8iTiR7,+FlJdiMZYUKIX79aBeyqmJcUsEHW011ZGKSg7WJXobtua6y5VutCq8qm1yBBcRlVdTEFBSjHjGg=',
    id: 'B147F63C31CE2347',
    isMultisig: false,
    name: 'Seed Account 6',
    node: '',
    path: "m/44'/4343'/5'/0'/0'",
    profileName: 'test',
    publicKey: '82D539A540E89EC5848BBE6CF95F2001CDE8A6DEB904D0ADA86D613A4FD0CACB',
    type: 1,
};
const account2: AccountModel = {
    address: 'TD2UU6EY4G4WSV5NJMVLVVNRKZOKEZIBYXBFZ4U2',
    encryptedPrivateKey:
        '5730f8e71484dc0cc8ff8a206552080dcbcfc244e1294bf1cc303198561c916ciDHHCOVVjNm3qx5xY6wLXpDjqV8iTiR7,+FlJdiMZYUKIX79aBeyqmJcUsEHW011ZGKSg7WJXobtua6y5VutCq8qm1yBBcRlVdTEFBSjHjGg=',
    id: 'D27115119E1DD723',
    isMultisig: false,
    name: 'Seed Account 6',
    node: '',
    path: "m/44'/4343'/5'/0'/0'",
    profileName: 'test',
    publicKey: '82D539A540E89EC5848BBE6CF95F2001CDE8A6DEB904D0ADA86D613A4FD0CACB',
    type: 1,
};

const tokenService = new TokenService();
tokenService.getTokenConfigurations = jest.fn().mockImplementation(() => {
    return tokenConfigurations;
});
describe('TokenService', () => {
    describe('configurations of different account should be separated', () => {
        test('account1 which exist in the data', () => {
            const newConfigs = {
                hidden: false,
            };
            const tokenConfigurations = tokenService.changeTokenConfiguration(tokenId, account1, newConfigs);
            expect(tokenConfigurations['05D6A80DE3C9ADCA'].hidden).toBe(false);
        });
        test("account2 which doesn't exist in the data", () => {
            const newConfigs = {
                hidden: true,
            };
            const tokenConfigurations = tokenService.changeTokenConfiguration(tokenId, account2, newConfigs);
            expect(tokenConfigurations['05D6A80DE3C9ADCA'].hidden).toBe(true);
        });
    });
});
