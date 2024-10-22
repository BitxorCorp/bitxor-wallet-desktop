/**
 *
 * (C) Bitxor Community 2022
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// external dependencies
import { AccountMetadataTransaction } from 'bitxor-sdk';

// internal dependencies
import { TransactionView } from './TransactionView';
import { TransactionDetailItem } from '@/core/transactions/TransactionDetailItem';
import { Formatters } from '../utils/Formatters';

// eslint-disable-next-line max-len
export class ViewAccountMetadataTransaction extends TransactionView<AccountMetadataTransaction> {
    /**
     * Displayed items
     */
    protected resolveDetailItems(): TransactionDetailItem[] {
        const metadataValue = Formatters.hexToUtf8(Buffer.from(this.transaction.value).toString('hex'));
        return [
            { key: 'sender', value: this.transaction.signer.address.pretty() },
            // @ts-ignore
            { key: 'target', value: this.transaction.targetAddress.pretty() },
            { key: 'scopedMetadataKey', value: this.transaction.scopedMetadataKey.toHex() },
            { key: 'value', value: metadataValue },
            { key: 'valueSizeDelta', value: this.transaction.valueSizeDelta },
            { key: 'scopedMetadataKey', value: this.transaction.scopedMetadataKey.toString() },
        ];
    }
}
