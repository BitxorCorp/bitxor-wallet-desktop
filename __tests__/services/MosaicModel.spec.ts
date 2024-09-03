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
import { Address, TokenFlags, TokenId, TokenInfo, NetworkType, PublicAccount, UInt64 } from 'bitxor-sdk';
import { TokenModel } from '@/core/database/entities/TokenModel';

describe('services/TokenData', () => {
    describe('serialization', () => {
        test('canSerializeDeserialize', () => {
            // act
            const address = Address.createFromEncoded('98090DC48CAE2D6FBF2F9B44CB09DFC2365076550BE017CA');

            const id = new TokenId('85BBEA6CC462B244');
            const tokenInfo = new TokenInfo(
                1,
                '85BBEA6CC462B244',
                id, // tokenId
                new UInt64([3403414400, 2095475]), // supply
                new UInt64([1, 0]), // height
                PublicAccount.createFromPublicKey(
                    'B4F12E7C9F6946091E2CB8B6D3A12B50D17CCBBF646386EA27CE2946A7423DCF',
                    NetworkType.TEST_NET,
                ).address,
                1, // revision
                TokenFlags.create(true, true, true),
                3,
                UInt64.fromUint(1000),
            );
            const expected = new TokenModel(address.plain(), address.plain(), 'someName', true, 1234, tokenInfo, 0);

            // assert
            expect(expected).not.toBeNull();
            expect(expected.tokenIdHex).toBe('85BBEA6CC462B244');
            expect(expected.addressRawPlain).toBe(address.plain());

            const deserialized: TokenModel = JSON.parse(JSON.stringify(expected));
            expect(deserialized).not.toBeNull();
            expect(deserialized.tokenIdHex).toBe('85BBEA6CC462B244');
            expect(deserialized.addressRawPlain).toBe(address.plain());
            expect(JSON.stringify(expected)).toBe(JSON.stringify(deserialized));

            const deserializedTokenInfo: TokenInfo = JSON.parse(JSON.stringify(tokenInfo));
            // NOTE I lose the methods!
            expect(deserializedTokenInfo).not.toBeNull();
            expect(deserializedTokenInfo.id.toHex).toBe(undefined);
            expect(deserializedTokenInfo.duration.compact).toBe(undefined);
        });
    });
});
