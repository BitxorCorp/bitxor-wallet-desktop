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
// internal dependencies
import { AssetTableService, TableField } from './AssetTableService';
import { TokenModel } from '@/core/database/entities/TokenModel';
import { TokenService } from '@/services/TokenService';
import { NetworkConfigurationModel } from '@/core/database/entities/NetworkConfigurationModel';
import { Formatters } from '@/core/utils/Formatters';

export class TokenTableService extends AssetTableService {
    constructor(
        currentHeight: number,
        private readonly tokens: TokenModel[],
        private readonly networkConfiguration: NetworkConfigurationModel,
    ) {
        super(currentHeight);
    }

    /**
     * Return table fields to be displayed in a table header
     * @returns {TableField[]}
     */
    public getTableFields(): TableField[] {
        return [
            { name: 'name', label: 'table_header_name' },
            { name: 'hexId', label: 'table_header_hex_id' },
            { name: 'supply', label: 'table_header_supply' },
            { name: 'expiration', label: 'table_header_expiration' },
            { name: 'divisibility', label: 'table_header_divisibility' },
            { name: 'transferable', label: 'table_header_transferable' },
            { name: 'supplyMutable', label: 'table_header_supply_mutable' },
            { name: 'restrictable', label: 'table_header_restrictable' },
        ];
    }

    /**
     * Return table values to be displayed in a table rows
     * @returns {TokenTableRowValues[]}
     */
    public getTableRows(): any[] {
        // - get reactive token data from the store
        const tokensInfo = this.tokens;
        const currentHeight = this.currentHeight;
        return tokensInfo
            .map((tokenInfo) => {
                const expiration = TokenService.getExpiration(
                    tokenInfo,
                    currentHeight,
                    this.networkConfiguration.blockGenerationTargetTime,
                );
                // - map table fields
                return {
                    
                    name: tokenInfo.name || 'N/A',
                    hexId: tokenInfo.tokenIdHex,
                    supply: Formatters.formatNumber(tokenInfo.supply / Math.pow(10, tokenInfo.divisibility), tokenInfo.divisibility),
                 //   balance: (tokenInfo.balance || 0) / Math.pow(10, tokenInfo.divisibility),
                    expiration: expiration,
                    divisibility: tokenInfo.divisibility,
                    transferable: tokenInfo.transferable,
                    supplyMutable: tokenInfo.supplyMutable,
                    restrictable: tokenInfo.restrictable,
                    metadataList: tokenInfo.metadataList || [],
                };
            })
            .filter((x) => x); // filter out tokens that are not yet available
    }
}
