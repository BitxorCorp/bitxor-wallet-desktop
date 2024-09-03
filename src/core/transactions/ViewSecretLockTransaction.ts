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
import { LockHashAlgorithm, SecretLockTransaction } from 'bitxor-sdk';
// internal dependencies
import { TransactionView } from './TransactionView';
import { AttachedToken } from '@/services/TokenService';
import { TransactionDetailItem } from '@/core/transactions/TransactionDetailItem';

// eslint-disable-next-line max-len
export class ViewSecretLockTransaction extends TransactionView<SecretLockTransaction> {
    /**
     * Displayed items
     */
    protected resolveDetailItems(): TransactionDetailItem[] {
        const attachedToken: AttachedToken = {
            id: this.transaction.token.id,
            tokenHex: this.transaction.token.id.toHex(),
            amount: this.transaction.token.amount.compact(),
        };
        return [
            { key: 'transfer_target', value: this.transaction.recipientAddress, isAddress: true },
            {
                key: `tokens`,
                value: attachedToken,
                isToken: true,
            },
            { key: 'duration', value: this.transaction.duration.compact() },
            {
                key: 'secret',
                value: this.transaction.secret,
            },
            {
                key: 'lock_hash_algorithm',
                value:
                    this.transaction.hashAlgorithm === LockHashAlgorithm.Op_Sha3_256
                        ? 'SHA3-256'
                        : this.transaction.hashAlgorithm === LockHashAlgorithm.Op_Hash_256
                        ? 'HASH-256'
                        : 'HASH-160',
            },
        ];
    }
}
