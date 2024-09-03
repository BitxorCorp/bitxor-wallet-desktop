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
    AddressAliasTransaction,
    HashLockTransaction,
    TokenAliasTransaction,
    TokenDefinitionTransaction,
    TokenSupplyChangeTransaction,
    MultisigAccountModificationTransaction,
    NamespaceRegistrationTransaction,
    Transaction,
    TransactionType,
    TransferTransaction,
    AccountKeyLinkTransaction,
    VotingKeyLinkTransaction,
    VrfKeyLinkTransaction,
    NodeKeyLinkTransaction,
    AccountMetadataTransaction,
    TokenMetadataTransaction,
    NamespaceMetadataTransaction,
    AccountAddressRestrictionTransaction,
    AccountTokenRestrictionTransaction,
    AccountOperationRestrictionTransaction,
    PersistentHarvestingDelegationMessage,
    SecretLockTransaction,
    SecretProofTransaction,
} from 'bitxor-sdk';
import { ViewUnknownTransaction } from '@/core/transactions/ViewUnknownTransaction';
import { ViewHashLockTransaction } from '@/core/transactions/ViewHashLockTransaction';
import { ViewMultisigAccountModificationTransaction } from '@/core/transactions/ViewMultisigAccountModificationTransaction';
import { ViewTokenDefinitionTransaction } from '@/core/transactions/ViewTokenDefinitionTransaction';
import { ViewTokenSupplyChangeTransaction } from '@/core/transactions/ViewTokenSupplyChangeTransaction';
import { ViewNamespaceRegistrationTransaction } from '@/core/transactions/ViewNamespaceRegistrationTransaction';
import { ViewTransferTransaction } from '@/core/transactions/ViewTransferTransaction';
import { ViewAliasTransaction } from '@/core/transactions/ViewAliasTransaction';
import { ViewAccountKeyLinkTransaction } from '@/core/transactions/ViewAccountKeyLinkTransaction';
import { Store } from 'vuex';
import { TransactionView } from '@/core/transactions/TransactionView';
import { ViewVotingKeyLinkTransaction } from '@/core/transactions/ViewVotingKeyLinkTransaction';
import { ViewVrfKeyLinkTransaction } from '@/core/transactions/ViewVrfKeyLinkTransaction';
import { ViewNodeKeyLinkTransaction } from './ViewNodeKeyLinkTransaction';
import { ViewAccountMetadataTransaction } from '@/core/transactions/ViewAccountMetadataTransaction';
import { ViewNamespaceMetadataTransaction } from '@/core/transactions/ViewNamespaceMetadataTransaction';
import { ViewTokenMetadataTransaction } from '@/core/transactions/ViewTokenMetadataTransaction';
import { ViewAccountAddressRestrictionTransaction } from './ViewAccountAddressRestrictionTransaction';
import { ViewAccountTokenRestrictionTransaction } from './ViewAccountTokenRestrictionTransaction';
import { ViewAccountOperationRestrictionTransaction } from './ViewAccountOperationRestrictionTransaction';
import { ViewHarvestingTransaction } from './ViewHarvestingTransaction';
import { ViewSecretLockTransaction } from './ViewSecretLockTransaction';
import { ViewSecretProofTransaction } from './ViewSecretProofTransaction';

/**
 * Transaction view factory.
 */
export class TransactionViewFactory {
    /**
     * It creates the view for the given transaction.
     *
     * @param $store the vue store.
     * @param transaction the transaction.
     */
    public static getView($store: Store<any>, transaction: Transaction): TransactionView<Transaction> {
        switch (transaction.type) {
            /// region XXX views for transaction types not yet implemented
            case TransactionType.AGGREGATE_BONDED:
            case TransactionType.AGGREGATE_COMPLETE:
            case TransactionType.TOKEN_ADDRESS_RESTRICTION:
            case TransactionType.TOKEN_GLOBAL_RESTRICTION:
                return new ViewUnknownTransaction($store, transaction);
            /// end-region XXX views for transaction types not yet implemented
            case TransactionType.ACCOUNT_ADDRESS_RESTRICTION:
                return new ViewAccountAddressRestrictionTransaction($store, transaction as AccountAddressRestrictionTransaction);
            case TransactionType.ACCOUNT_TOKEN_RESTRICTION:
                return new ViewAccountTokenRestrictionTransaction($store, transaction as AccountTokenRestrictionTransaction);
            case TransactionType.ACCOUNT_OPERATION_RESTRICTION:
                return new ViewAccountOperationRestrictionTransaction($store, transaction as AccountOperationRestrictionTransaction);
            case TransactionType.ACCOUNT_METADATA:
                return new ViewAccountMetadataTransaction($store, transaction as AccountMetadataTransaction);
            case TransactionType.TOKEN_METADATA:
                return new ViewTokenMetadataTransaction($store, transaction as TokenMetadataTransaction);
            case TransactionType.NAMESPACE_METADATA:
                return new ViewNamespaceMetadataTransaction($store, transaction as NamespaceMetadataTransaction);
            case TransactionType.HASH_LOCK:
                return new ViewHashLockTransaction($store, transaction as HashLockTransaction);
            case TransactionType.MULTISIG_ACCOUNT_MODIFICATION:
                return new ViewMultisigAccountModificationTransaction($store, transaction as MultisigAccountModificationTransaction);
            case TransactionType.VRF_KEY_LINK:
                return new ViewVrfKeyLinkTransaction($store, transaction as VrfKeyLinkTransaction);
            case TransactionType.NODE_KEY_LINK:
                return new ViewNodeKeyLinkTransaction($store, transaction as NodeKeyLinkTransaction);
            case TransactionType.VOTING_KEY_LINK:
                return new ViewVotingKeyLinkTransaction($store, transaction as VotingKeyLinkTransaction);
            case TransactionType.TOKEN_DEFINITION:
                return new ViewTokenDefinitionTransaction($store, transaction as TokenDefinitionTransaction);
            case TransactionType.TOKEN_SUPPLY_CHANGE:
                return new ViewTokenSupplyChangeTransaction($store, transaction as TokenSupplyChangeTransaction);
            case TransactionType.NAMESPACE_REGISTRATION:
                return new ViewNamespaceRegistrationTransaction($store, transaction as NamespaceRegistrationTransaction);
            case TransactionType.TRANSFER: {
                const transferTransaction = transaction as TransferTransaction;
                return transferTransaction.message instanceof PersistentHarvestingDelegationMessage
                    ? new ViewHarvestingTransaction($store, transferTransaction)
                    : new ViewTransferTransaction($store, transferTransaction);
            }
            case TransactionType.TOKEN_ALIAS:
                return new ViewAliasTransaction($store, transaction as TokenAliasTransaction);
            case TransactionType.ADDRESS_ALIAS:
                return new ViewAliasTransaction($store, transaction as AddressAliasTransaction);
            case TransactionType.ACCOUNT_KEY_LINK:
                return new ViewAccountKeyLinkTransaction($store, transaction as AccountKeyLinkTransaction);
            case TransactionType.SECRET_LOCK:
                return new ViewSecretLockTransaction($store, transaction as SecretLockTransaction);
            case TransactionType.SECRET_PROOF:
                return new ViewSecretProofTransaction($store, transaction as SecretProofTransaction);
            default:
                throw new Error(`View not implemented for transaction type '${transaction.type}'`);
        }
    }
}
