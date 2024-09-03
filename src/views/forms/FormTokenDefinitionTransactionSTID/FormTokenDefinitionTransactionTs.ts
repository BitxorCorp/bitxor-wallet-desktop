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
import {
    TokenDefinitionTransaction,
    TokenFlags,
    TokenId,
    TokenNonce,
    TokenSupplyChangeAction,
    TokenSupplyChangeTransaction,
    Transaction,
    UInt64,
} from 'bitxor-sdk';
import { Component, Prop, Watch } from 'vue-property-decorator';
// internal dependencies
import { FormTransactionBase } from '@/views/forms/FormTransactionBase/FormTransactionBase';
// child components
import { ValidationObserver, ValidationProvider } from 'vee-validate';
// @ts-ignore
import FormWrapper from '@/components/FormWrapper/FormWrapper.vue';
// @ts-ignore
import SignerSelector from '@/components/SignerSelector/SignerSelector.vue';
// @ts-ignore
import SupplyInput from '@/components/SupplyInput/SupplyInput.vue';
// @ts-ignore
import DivisibilityInput from '@/components/DivisibilityInput/DivisibilityInput.vue';
// @ts-ignore
import SupplyAmount from '@/components/SupplyAmount/SupplyAmount.vue';
// @ts-ignore
import DurationInput from '@/components/DurationInput/DurationInput.vue';
// @ts-ignore
import ModalTransactionConfirmation from '@/views/modals/ModalTransactionConfirmation/ModalTransactionConfirmation.vue';
// @ts-ignore
import MaxFeeAndSubmit from '@/components/MaxFeeAndSubmit/MaxFeeAndSubmit.vue';
// @ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue';
//@ts-ignore
import RentalFee from '@/components/RentalFees/RentalFee.vue';

@Component({
    components: {
        ValidationObserver,
        ValidationProvider,
        FormWrapper,
        SignerSelector,
        SupplyInput,
        DivisibilityInput,
        SupplyAmount,
        DurationInput,
        ModalTransactionConfirmation,
        MaxFeeAndSubmit,
        FormRow,
        RentalFee,
    },
})
export class FormTokenDefinitionTransactionTs extends FormTransactionBase {
    @Prop({
        default: () => ({}),
    })
    value: any;

    @Prop({
        default: '',
    })
    title: string;

    @Prop({
        default: false,
    })
    isAggregate: boolean;

    @Prop({
        default: false,
    })
    hideSave: boolean;
    /**
     * Form items
     * @var {Record<string, any>}
     */
    public formItems = {
        signerAddress: '',
        supply: 500000000,
        divisibility: 0,
        supplyMutable: true,
        transferable: true,
        restrictable: true,
        permanent: true,
        revokable: true,
        duration: 10000,
        maxFee: 0,
    };

    /**
     * Reset the form with properties
     * @return {void}
     */
    protected resetForm() {
        // - re-populate form if transaction staged
        // if (this.stagedTransactions.length) {
        //   const definition = this.stagedTransactions.find(staged => staged.type === TransactionType.TOKEN_DEFINITION)
        //   const supply = this.stagedTransactions.find(staged => staged.type === TransactionType.TOKEN_SUPPLY_CHANGE)
        //   if (definition === undefined || supply === undefined) return
        //   this.setTransactions([
        //     definition as TokenDefinitionTransaction,
        //     supply as TokenSupplyChangeTransaction
        //   ])
        //   this.isAwaitingSignature = true
        //   return ;
        // }

        // - set default form values
        this.formItems.signerAddress = this.selectedSigner ? this.selectedSigner.address.plain() : this.currentAccount.address;
        this.formItems.supplyMutable = this.isAggregate;
        this.formItems.restrictable = false;
        this.formItems.revokable = false;
        this.formItems.permanent = true;
        this.formItems.duration = 10000;
        this.formItems.divisibility = 0;

        // - maxFee must be absolute
        this.formItems.maxFee = this.defaultFee;
    }

    /// region computed properties getter/setter
    /**
     * Getter for TOKEN DEFINITION and SUPPLY CHANGE transactions that will be staged
     * @see {FormTransactionBase}
     * @return {TransferTransaction[]}
     */
    protected getTransactions(): Transaction[] {
        const maxFee = UInt64.fromUint(this.formItems.maxFee);
        //const publicAccount = PublicAccount.createFromPublicKey(this.selectedSigner.publicKey, this.networkType)
        const randomNonce = TokenNonce.createRandom();
        // - read form for definition
        const tokenId = TokenId.createFromNonce(randomNonce, this.selectedSigner.address);
        // the duration must be 0 when the permanent value of true
        if (this.formItems.permanent) {
            this.formItems.duration = 0;
        }
        const tokenDefinitionTransaction = TokenDefinitionTransaction.create(
            this.createDeadline(),
            randomNonce,
            tokenId,
            TokenFlags.create(
                this.formItems.supplyMutable,
                this.formItems.transferable,
                this.formItems.restrictable,
                this.formItems.revokable,
            ),
            this.formItems.divisibility,
            UInt64.fromUint(this.formItems.duration),
            this.networkType,
            maxFee,
        );
        const tokenSupplyChangeTransaction = TokenSupplyChangeTransaction.create(
            this.createDeadline(),
            tokenId,
            TokenSupplyChangeAction.Increase,
            UInt64.fromUint(this.formItems.supply),
            this.networkType,
            maxFee,
        );
        return [tokenDefinitionTransaction, tokenSupplyChangeTransaction];
    }

    /**
     * Setter for TRANSFER transactions that will be staged
     * @see {FormTransactionBase}
     * @param {TransferTransaction[]} transactions
     * @throws {Error} If not overloaded in derivate component
     */
    protected setTransactions(transactions: Transaction[]) {
        // - this form creates 2 transaction
        const definition = transactions.shift() as TokenDefinitionTransaction;
        const supplyChange = transactions.shift() as TokenSupplyChangeTransaction;

        // - populate from definition
        this.formItems.divisibility = definition.divisibility;
        this.formItems.supplyMutable = definition.flags.supplyMutable;
        this.formItems.transferable = definition.flags.transferable;
        this.formItems.restrictable = definition.flags.restrictable;
        this.formItems.revokable = definition.flags.revokable;
        this.formItems.permanent = definition.duration.compact() === 0;
        this.formItems.duration = definition.duration.compact();

        // - populate from supply change
        this.formItems.supply = supplyChange.delta.compact();

        // - populate maxFee
        this.formItems.maxFee = definition.maxFee.compact();
    }
    /**
     * emit formItems values to aggregate transaction form to be saved in storage
     */
    public emitToAggregate() {
        if (this.getTransactions().length > 0) {
            this.$emit('txInput', this.formItems);
        }
    }
    mounted() {
        if (this.isAggregate && this.value) {
            Object.assign(this.formItems, this.value);
            // set supplyMutable to true by default so users will be able to change supply after creating the token
            this.formItems.supplyMutable = true;
        }
    }
    /**
     * watch title to change form items on select different transactions
     */
    @Watch('title')
    onTitleChange() {
        if (this.isAggregate) {
            Object.assign(this.formItems, this.value);
        }
    }
    /**
     * Resetting the form when choosing a multisig signer and changing multisig signer
     * Is necessary to make the token inputs reactive
     */
    public async signerChanged(address: string) {
        await this.onChangeSigner(address);
        this.resetForm();
    }
}
