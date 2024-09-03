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
    Address,
    AddressAliasTransaction,
    AliasAction,
    AliasTransaction,
    AliasType,
    TokenAliasTransaction,
    TokenId,
    NamespaceId,
    UInt64,
} from 'bitxor-sdk';
import { Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
// internal dependencies
import { ValidationRuleset } from '@/core/validation/ValidationRuleset';
import { FormTransactionBase } from '../FormTransactionBase/FormTransactionBase';
// child components
import { ValidationObserver, ValidationProvider } from 'vee-validate';
// @ts-ignore
import FormWrapper from '@/components/FormWrapper/FormWrapper.vue';
// @ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue';
// @ts-ignore
import ErrorTooltip from '@/components/ErrorTooltip/ErrorTooltip.vue';
// @ts-ignore
import NamespaceSelector from '@/components/NamespaceSelector/NamespaceSelector.vue';
// @ts-ignore
import TokenSelector from '@/components/TokenSelector/TokenSelector.vue';
// @ts-ignore
import AddressInput from '@/components/AddressInput/AddressInput.vue';
// @ts-ignore
import MaxFeeSelector from '@/components/MaxFeeSelector/MaxFeeSelector.vue';
// @ts-ignore
import ModalTransactionConfirmation from '@/views/modals/ModalTransactionConfirmation/ModalTransactionConfirmation.vue';
// @ts-ignore
import MaxFeeAndSubmit from '@/components/MaxFeeAndSubmit/MaxFeeAndSubmit.vue';
import { TokenModel } from '@/core/database/entities/TokenModel';
import { NamespaceModel } from '@/core/database/entities/NamespaceModel';
// @ts-ignore
import SignerSelector from '@/components/SignerSelector/SignerSelector.vue';

@Component({
    components: {
        ValidationProvider,
        ValidationObserver,
        FormWrapper,
        FormRow,
        ErrorTooltip,
        NamespaceSelector,
        TokenSelector,
        AddressInput,
        MaxFeeSelector,
        ModalTransactionConfirmation,
        MaxFeeAndSubmit,
        SignerSelector,
    },
    computed: {
        ...mapGetters({
            namespaces: 'namespace/ownedNamespaces',
            tokens: 'token/ownedTokens',
            currentHeight: 'network/currentHeight',
        }),
    },
})
export class FormAliasTransactionTs extends FormTransactionBase {
    @Prop({ default: null }) namespaceId: NamespaceId;
    @Prop({ default: null }) aliasTarget: TokenId | Address;
    @Prop({ default: null, required: true }) aliasAction: AliasAction;
    @Prop({ default: false }) hideSubmit: boolean;
    /**
     * Type of assets shown in the form alias
     * @type {string}
     */
    @Prop({ default: 'namespace' }) assetType: string;
    /**
     * Alias action
     * @protected
     */
    protected AliasAction = AliasAction;

    /**
     * Validation rules
     */
    protected validationRules = ValidationRuleset;

    /**
     * Form items
     */
    protected formItems = {
        namespaceFullName: null,
        aliasTarget: null,
        aliasAction: null,
        maxFee: 0,
        signerAddress: '',
    };

    /**
     * Alias target type
     * @protected
     * @type {('token' | 'address')}
     */
    protected aliasTargetType: 'token' | 'address' = this.aliasTarget instanceof Address ? 'address' : 'token';

    /**
     * Current account owned namespaces
     * @private
     */
    private namespaces: NamespaceModel[];

    /**
     * Current account owned tokens
     * @private
     */
    private tokens: TokenModel[];

    /**
     * Current network height
     * @private
     * @type {number}
     */
    private currentHeight: number;

    /**
     * Current account namespace hex Ids that can be linked
     * @readonly
     * @protected
     * @type {string []}
     */
    protected get linkableNamespaces(): NamespaceModel[] {
        return this.namespaces.filter(({ aliasType }) => aliasType === AliasType.None);
    }

    /**
     * Current account tokens hex Ids that can be linked
     * @readonly
     * @protected
     */
    protected get linkableTokens(): string[] {
        return this.tokens
            .filter((tokenInfo) => {
                // no tokens with names
                const tokenName = tokenInfo.name;
                if (tokenName && tokenName.length) {
                    return false;
                }

                // tokens must not be expired
                if (tokenInfo.duration == 0) {
                    return true;
                }
                return tokenInfo.height + tokenInfo.duration > this.currentHeight;
            })
            .map(({ tokenIdHex }) => tokenIdHex);
    }

    /**
     * Reset the form with properties
     * @return {void}
     */
    protected resetForm() {
        // - re-populate form if transaction staged
        // if (this.stagedTransactions.length) {
        //   const transaction = this.stagedTransactions.find(
        //     staged => staged.type === TransactionType.TOKEN_ALIAS || staged.type ===
        // TransactionType.ADDRESS_ALIAS, ) this.setTransactions([transaction as AliasTransaction])
        // this.isAwaitingSignature = true return }

        this.formItems.signerAddress = this.selectedSigner ? this.selectedSigner.address.plain() : this.currentAccount.address;

        /**
         * Helper function to get the alias target as a string
         * @param {(TokenId | Address)} aliasTarget
         * @returns {string}
         */
        const getAliasTarget = (aliasTarget: TokenId | Address): string => {
            if (!aliasTarget) {
                return null;
            }
            if (aliasTarget instanceof Address) {
                return aliasTarget.plain();
            }
            return aliasTarget.id.toHex();
        };

        // - set default form values
        this.formItems.namespaceFullName = this.namespaceId ? this.namespaceId.fullName : null;
        this.formItems.aliasTarget = getAliasTarget(this.aliasTarget);
        this.formItems.aliasAction = this.aliasAction;

        // - maxFee must be absolute
        this.formItems.maxFee = this.defaultFee;
    }

    /**
     * Getter for ALIAS transactions that will be staged
     * @see {FormTransactionBase}
     * @return {AliasTransaction[]}
     */
    protected getTransactions(): AliasTransaction[] {
        const namespaceId = new NamespaceId(this.formItems.namespaceFullName);
        const maxFee = UInt64.fromUint(this.formItems.maxFee);
        if (this.aliasTargetType === 'address') {
            return [
                AddressAliasTransaction.create(
                    this.createDeadline(),
                    this.formItems.aliasAction,
                    namespaceId,
                    Address.createFromRawAddress(this.formItems.aliasTarget),
                    this.networkType,
                    maxFee,
                ),
            ];
        } else {
            return [
                TokenAliasTransaction.create(
                    this.createDeadline(),
                    this.formItems.aliasAction,
                    namespaceId,
                    new TokenId(this.formItems.aliasTarget),
                    this.networkType,
                    maxFee,
                ),
            ];
        }
    }

    /**
     * Setter for Alias transactions that will be staged
     * @see {FormTransactionBase}
     * @param {AliasTransaction[]} transactions
     * @throws {Error} If not overloaded in derivate component
     */
    protected setTransactions(transactions: AliasTransaction[]) {
        // - this form creates only 1 transaction
        const transaction = transactions.shift();
        if (!transaction) {
            return;
        }

        // - populate for items if transaction is an address alias
        if (transaction instanceof AddressAliasTransaction) {
            this.formItems.namespaceFullName = transaction.namespaceId.fullName;
            this.formItems.aliasTarget = transaction.address.plain();
            this.formItems.aliasAction = transaction.aliasAction;
        }

        // - populate for items if transaction is an token alias
        if (transaction instanceof TokenAliasTransaction) {
            this.formItems.namespaceFullName = transaction.namespaceId.fullName;
            this.formItems.aliasTarget = transaction.namespaceId.toHex();
            this.formItems.aliasAction = transaction.aliasAction;
        }

        // - populate maxFee
        this.formItems.maxFee = transaction.maxFee.compact();
    }
}
