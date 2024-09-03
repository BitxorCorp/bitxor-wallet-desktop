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
import { NamespaceId, PublicAccount, TransactionType, TransferTransaction } from 'bitxor-sdk';
// internal dependencies
import { TransactionView } from './TransactionView';
import { AttachedToken } from '@/services/TokenService';
import i18n from '@/language';
import { TransactionDetailItem } from '@/core/transactions/TransactionDetailItem';
import { TokenService } from '@/services/TokenService';
import { TokenModel } from '@/core/database/entities/TokenModel';
export class ViewTransferTransaction extends TransactionView<TransferTransaction> {
    public get isIncoming() {
        const currentSignerAddress = this.$store.getters['account/currentSignerAddress'];
        if (this.transaction.type === TransactionType.TRANSFER && this.transaction.recipientAddress instanceof NamespaceId) {
            const linkedAddress = this.$store.getters['namespace/linkedAddress'];
            if (!linkedAddress) {
                this.checkLinkedAddress(this.transaction.recipientAddress);
                return false;
            }
            if (currentSignerAddress.equals(linkedAddress)) {
                return true;
            }
        }
        return this.transaction.recipientAddress && currentSignerAddress && this.transaction.recipientAddress.equals(currentSignerAddress);
    }

    private async checkLinkedAddress(recipientNamespaceId) {
        return await this.$store.dispatch('namespace/GET_LINKED_ADDRESS', recipientNamespaceId);
    }

    /**
     * Displayed sender
     * @var {string}
     */
    private get sender(): string {
        if (this.transaction.signer) {
            return this.transaction.signer.address.pretty();
        }
        const currentSignerAddress = this.$store.getters['account/currentSignerAddress'];
        return currentSignerAddress ? currentSignerAddress.pretty() : '';
    }

    /**
     * get available tokens to check if any of them is expired
     * @var {TokenModel[]}
     */
    private get availableTokens(): TokenModel[] {
        const currentHeight = this.$store.getters['network/currentHeight'];
        const networkConfiguration = this.$store.getters['network/networkConfiguration'];
        const holdTokens = this.$store.getters['token/holdTokens'];
        return holdTokens.filter((entry) => {
            const expiration = TokenService.getExpiration(entry, currentHeight, networkConfiguration.blockGenerationTargetTime);
            return expiration !== 'expired';
        });
    }

    /**
     * Displayed items
     */
    protected resolveDetailItems(): TransactionDetailItem[] {
        const transaction = this.transaction;
        const attachedTokens = transaction.tokens.map((transactionToken) => {
            return {
                id: transactionToken.id,
                tokenHex: transactionToken.id.toHex(),
                amount: transactionToken.amount.compact(),
            } as AttachedToken;
        });
        const message = this.transaction.message;
        const incoming = this.isIncoming;
        const tokenItems = attachedTokens.map((token, index, self) => {
            const color = incoming ? 'green' : 'red';
            const tokenLabel = i18n.t('token');
            const networkConfiguration = this.$store.getters['network/networkConfiguration'];

            // check if token not expired yet
            return this.availableTokens.some((entry) => entry.tokenIdHex == token.tokenHex) ||
                token.tokenHex === networkConfiguration.currencyTokenId
                ? {
                      key: `${tokenLabel} (${index + 1}/${self.length})`,
                      value: { ...token, color },
                      isToken: true,
                  }
                : {
                      key: `${tokenLabel} (${index + 1}/${self.length}) ${i18n.t('token_expired')}`,
                      value: { ...token, color },
                      isToken: true,
                  };
        });

        return [
            { key: 'sender', value: this.sender },
            { key: 'transfer_target', value: this.transaction.recipientAddress, isAddress: true },
            ...tokenItems,
            {
                key: 'message',
                value: {
                    message: message,
                    incoming: this.isIncoming,
                    recipient: this.transaction.recipientAddress,
                    unannounced: this.transaction.isUnannounced(),
                    signer: this.transaction.signer
                        ? PublicAccount.createFromPublicKey(this.transaction.signer.publicKey, this.transaction.networkType)
                        : null,
                },
                isMessage: true,
            },
        ];
    }
}
