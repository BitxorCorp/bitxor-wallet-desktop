import { Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
// @ts-ignore
import FormTransferTransaction from '@/views/forms/FormTransferTransaction/FormTransferTransaction.vue';
// @ts-ignore
import FormNamespaceRegistrationTransaction from '@/views/forms/FormNamespaceRegistrationTransaction/FormNamespaceRegistrationTransaction.vue';
// @ts-ignore
import FormTokenDefinitionTransaction from '@/views/forms/FormTokenDefinitionTransaction/FormTokenDefinitionTransaction.vue';
import {
    TransferTransaction,
    PlainMessage,
    UInt64,
    Address,
    NetworkType,
    Transaction,
    NamespaceId,
    PublicAccount,
    TokenDefinitionTransaction,
    TokenNonce,
    TokenId,
    TokenFlags,
    NamespaceRegistrationTransaction,
    TokenSupplyChangeAction,
    TokenSupplyChangeTransaction,
} from 'bitxor-sdk';
import { AccountModel } from '@/core/database/entities/AccountModel';
import { FormTransactionBase } from '@/views/forms/FormTransactionBase/FormTransactionBase';
// @ts-ignore
import FormWrapper from '@/components/FormWrapper/FormWrapper';
import { ValidationObserver } from 'vee-validate';
// @ts-ignore
import MaxFeeSelector from '@/components/MaxFeeSelector/MaxFeeSelector.vue';
// @ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue';
// @ts-ignore
import ModalTransactionConfirmation from '@/views/modals/ModalTransactionConfirmation/ModalTransactionConfirmation.vue';
import { AddressValidator, AliasValidator } from '@/core/validation/validators';
import { TransactionCommand, TransactionCommandMode } from '@/services/TransactionCommand';
// @ts-ignore
import ModalTransactionEdit from '@/views/modals/ModalTransactionEdit/ModalTransactionEdit.vue';
// @ts-ignore
import NavigationTabs from '@/components/NavigationTabs/NavigationTabs.vue';
// @ts-ignore
import FormTokenSupplyChangeTransaction from '@/views/forms/FormTokenSupplyChangeTransaction/FormTokenSupplyChangeTransaction.vue';

@Component({
    components: {
        FormWrapper,
        ValidationObserver,
        FormTransferTransaction,
        FormNamespaceRegistrationTransaction,
        FormTokenDefinitionTransaction,
        FormTokenSupplyChangeTransaction,
        FormRow,
        MaxFeeSelector,
        ModalTransactionConfirmation,
        ModalTransactionEdit,
        NavigationTabs,
    },
    computed: {
        ...mapGetters({
            simpleAggregateTransaction: 'aggregateTransaction/simpleAggregateTransaction',
            aggregateTransactionIndex: 'aggregateTransaction/aggregateTransactionIndex',
            networkType: 'network/networkType',
            currentAccount: 'account/currentAccount',
        }),
    },
    beforeRouteUpdate(to, from, next) {
        this.beforeRouteUpdate(to, from, next);
    },
    watch: {
        aggregateTransactionIndex: function () {
            this.aggregateTransactionIndexChanged();
        },
    },
})
export class FormAggregateTransactionTs extends FormTransactionBase {
    private simpleAggregateTransaction: [];
    private aggregateTransactionIndex: number;

    // called from watch
    private aggregateTransactionIndexChanged() {
        this.currentSelectedTransaction.title = this.getTransactionTitle(this.$route.name);
        this.$forceUpdate();
    }

    public formItems = {
        maxFee: 0,
        recipientRaw: '',
        signerPublicKey: '',
    };

    public showTransactionEditModal: boolean = false;

    /**
     * current selected saved transaction
     * @var {object}
     */
    public currentSelectedTransaction: { title?: string; component?: any; formItems?: any } = {};

    public toBeEditedTransaction = {};

    public networkType: NetworkType;

    public currentAccount: AccountModel;

    public mounted(): void {
        this.createTransaction(this.$route.name);
    }

    public beforeRouteUpdate(to, from, next) {
        this.createTransaction(to.name);
        next();
    }

    public createTransaction(type: string): void {
        this.$refs['transactionForm']?.reset();
        const transaction = {};

        switch (type) {
            case 'aggregate.simple':
                transaction['component'] = FormTransferTransaction;
                break;
            case 'aggregate.token':
                transaction['component'] = FormTokenDefinitionTransaction;
                break;
            case 'aggregate.supply':
                transaction['component'] = FormTokenSupplyChangeTransaction;
                break;
            case 'aggregate.namespace':
                transaction['component'] = FormNamespaceRegistrationTransaction;
                break;
        }
        transaction['title'] = this.getTransactionTitle(type);
        this.currentSelectedTransaction = transaction;
    }

    private getTransactionTitle(type: string) {
        switch (type) {
            case 'aggregate.simple':
                return `${this.$t('simple_transaction')}` + this.aggregateTransactionIndex;
            case 'aggregate.token':
                return `${this.$t('token_transaction')}` + this.aggregateTransactionIndex;
            case 'aggregate.namespace':
                return `${this.$t('namespace_transaction')}` + this.aggregateTransactionIndex;
            case 'aggregate.supply':
                return `${this.$t('token_supply_transaction')}` + this.aggregateTransactionIndex;
        }
    }

    // on click delete transaction
    public async onClickDelete(title: string): Promise<void> {
        await this.$store.dispatch('aggregateTransaction/ON_DELETE_TRANSACTION', title);
    }

    // fetch form details for the selected transaction
    public onSelectTx(title: string) {
        this.$store.dispatch('aggregateTransaction/GET_TRANSACTION_FROM_AGGREGATE_ARRAY', title).then((val) => {
            if (val) {
                this.toBeEditedTransaction = val;
                this.showTransactionEditModal = true;
            }
        });
    }

    public async saveEditedTransaction(formItems) {
        await this.$store.dispatch('aggregateTransaction/ON_SAVE_TRANSACTION', {
            title: this.toBeEditedTransaction['title'],
            formItems,
            component: this.toBeEditedTransaction['component'],
        });
        this.toBeEditedTransaction = undefined;
        this.showTransactionEditModal = false;
    }

    /**
     * on click save transaction, it should be added to the store
     */
    public async onSaveTransaction(value) {
        if (value) {
            await this.$store.dispatch('aggregateTransaction/ON_SAVE_TRANSACTION', {
                title: this.currentSelectedTransaction['title'],
                formItems: value,
                component: this.currentSelectedTransaction['component'],
            });
            this.createTransaction(this.$route.name);
        }
    }
    /**
     * create transfer transaction
     */
    private createTransferTx(tx: {}): TransferTransaction {
        const maxFee = UInt64.fromUint(this.formItems.maxFee);
        this.formItems.recipientRaw = tx['formItems']['recipientRaw'];
        const signer = tx['formItems']['signerPublicKey']
            ? PublicAccount.createFromPublicKey(tx['formItems']['signerPublicKey'], this.networkType)
            : undefined;
        const t: TransferTransaction = TransferTransaction.create(
            this.createDeadline(),
            this.instantiatedRecipient,
            !tx['formItems']['tokens'].length ? [] : tx['formItems']['tokens'],
            tx['formItems']['encryptMessage']
                ? tx['formItems']['encyptedMessage']
                : PlainMessage.create(tx['formItems']['messagePlain'] || ''),
            this.networkType,
            maxFee,
            undefined,
            signer,
        );

        return t;
    }
    /**
     * create token definition transaction
     */
    private createTokenTx(tx: {}): TokenDefinitionTransaction {
        const maxFee = UInt64.fromUint(this.formItems.maxFee);
        //const publicAccount = PublicAccount.createFromPublicKey(this.selectedSigner.publicKey, this.networkType)
        const randomNonce = TokenNonce.createRandom();
        // - read form for definition
        const tokenId = TokenId.createFromNonce(randomNonce, this.selectedSigner.address);
        // the duration must be 0 when the permanent value of true
        if (tx['formItems']['permanent'] == true) {
            tx['formItems']['duration'] == 0;
        }
        return TokenDefinitionTransaction.create(
            this.createDeadline(),
            randomNonce,
            tokenId,
            TokenFlags.create(tx['formItems']['supplyMutable'], tx['formItems']['transferable'], this['formItems']['restrictable']),
            tx['formItems']['divisibility'],
            UInt64.fromUint(tx['formItems']['duration']),
            this.networkType,
            maxFee,
        );
    }
    private createTokenSupplyTx(tx: {}): TokenSupplyChangeTransaction {
        const maxFee = UInt64.fromUint(tx['formItems']['maxFee']);
        const action = tx['formItems']['action'] == 1 ? TokenSupplyChangeAction.Increase : TokenSupplyChangeAction.Decrease;
        const tokenId = new TokenId(tx['formItems']['tokenHexId']);
        const delta = UInt64.fromUint(tx['formItems']['delta']);
        return TokenSupplyChangeTransaction.create(this.createDeadline(), tokenId, action, delta, this.networkType, maxFee);
    }
    /**
     * create root namespace transaction
     */
    private CreateRootNameSpaceTx(tx: {}): NamespaceRegistrationTransaction {
        const maxFee = UInt64.fromUint(this.formItems.maxFee);

        return NamespaceRegistrationTransaction.createRootNamespace(
            this.createDeadline(),
            tx['formItems']['newNamespaceName'],
            UInt64.fromUint(tx['formItems']['duration']),
            this.networkType,
            maxFee,
        );
    }

    // /**
    //  * Recipient used in the transaction
    //  * @readonly
    //  * @protected
    //  * @type {Address}
    //  */
    protected get instantiatedRecipient(): Address | NamespaceId {
        const { recipientRaw } = this.formItems;
        if (AddressValidator.validate(recipientRaw)) {
            return Address.createFromRawAddress(recipientRaw);
        } else if (AliasValidator.validate(recipientRaw)) {
            return new NamespaceId(recipientRaw);
        } else {
            return null;
        }
    }

    /**
     * Reset the form with properties
     * @return {void}
     */
    protected resetForm() {
        // - maxFee must be absolute
        this.formItems.maxFee = this.defaultFee;
        this.formItems.signerPublicKey = '';
    }

    /**
     * Setter for TRANSFER transactions that will be staged
     * @see {FormTransactionBase}
     * @throws {Error} If not overloaded in derivate component
     */
    protected setTransactions() {
        throw new Error('This transaction can not be staged');
    }

    /**
     * clear aggregate transactions list after initiating the transaction
     */
    public onConfirmationSuccess() {
        this.$store.dispatch('aggregateTransaction/CLEAR_AGGREGATE_TRANSACTIONS_LIST');
        this.resetForm();
    }

    protected getTransactionCommandMode(transactions: Transaction[]): TransactionCommandMode {
        if (
            this.isMultisigMode() ||
            this.simpleAggregateTransaction.some((tx) => {
                if (tx['formItems']['signerAddress']) {
                    return tx['formItems']['signerAddress'] !== this.currentAccount.address;
                }
                if (tx['formItems']['signerPublicKey']) {
                    return this.currentSignerPublicKey !== tx['formItems']['signerPublicKey'];
                }
                return false;
            })
        ) {
            return TransactionCommandMode.MULTISIGN;
        }
        if (transactions.length > 1) {
            return TransactionCommandMode.AGGREGATE;
        } else {
            return TransactionCommandMode.SIMPLE;
        }
    }

    /**
     * Getter for Aggregate transactions that will be staged
     * @see {FormTransactionBase}
     * @return {Transaction[]}
     */
    protected getTransactions(): Transaction[] {
        const aggregateTransactions = [];
        if (this.simpleAggregateTransaction.length > 0) {
            this.simpleAggregateTransaction.map((tx) => {
                let transaction: Transaction;
                // @ts-ignore
                if (tx['title'].indexOf(`${this.$t('simple_transaction')}`) !== -1) {
                    transaction = this.createTransferTx(tx);
                    // @ts-ignore
                } else if (tx['title'].indexOf(`${this.$t('token_transaction')}`) !== -1) {
                    transaction = this.createTokenTx(tx);
                    // @ts-ignore
                } else if (tx['title'].indexOf(`${this.$t('token_supply_transaction')}`) !== -1) {
                    transaction = this.createTokenSupplyTx(tx);
                } else {
                    transaction = this.CreateRootNameSpaceTx(tx);
                }
                aggregateTransactions.push(transaction);
            });
        }
        return aggregateTransactions;
    }

    public onSubmit(): TransactionCommand {
        this.command = this.createTransactionCommand();
        this.onShowConfirmationModal();
        return this.command;
    }

    public parentRouteName = 'aggregate';
}
