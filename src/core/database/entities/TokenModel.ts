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

import { TokenInfo } from 'bitxor-sdk';
import { MetadataModel } from './MetadataModel';

/**
 * Stored POJO that holds token information.
 *
 * The stored data is cached from rest.
 *
 * The object is serialized and deserialized to/from JSON. no method or complex attributes can be fined.
 *
 */
export class TokenModel {
    public readonly tokenIdHex: string;
    public readonly divisibility: number;
    public readonly transferable: boolean;
    public readonly supplyMutable: boolean;
    public readonly restrictable: boolean;
    public readonly duration: number;
    public readonly height: number;
    public readonly supply: number;
    public metadataList: MetadataModel[] = [];

    constructor(
        public readonly addressRawPlain: string,
        public readonly ownerRawPlain: string,
        public readonly name: string | undefined,
        public readonly isCurrencyToken: boolean,
        public readonly balance: number | undefined,
        tokenInfo: TokenInfo,
        public lastprice: number | undefined,

    ) {
        this.tokenIdHex = tokenInfo.id.toHex();
        this.divisibility = tokenInfo.divisibility;
        this.transferable = tokenInfo.isTransferable();
        this.supplyMutable = tokenInfo.isSupplyMutable();
        this.restrictable = tokenInfo.isRestrictable();
        this.duration = tokenInfo.duration.compact();
        this.height = tokenInfo.startHeight.compact();
        this.supply = tokenInfo.supply.compact();
    }
}
