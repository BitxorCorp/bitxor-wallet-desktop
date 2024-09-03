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
import { TokenId, TokenSupplyChangeAction, TokenSupplyChangeTransaction, Transaction, UInt64 } from 'bitxor-sdk';
import { Component, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { FormTransactionBase } from '@/views/forms/FormTransactionBase/FormTransactionBase';
import { ValidationRuleset } from '@/core/validation/ValidationRuleset';
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
import DurationInput from '@/components/DurationInput/DurationInput.vue';
// @ts-ignore
import ModalTransactionConfirmation from '@/views/modals/ModalTransactionConfirmation/ModalTransactionConfirmation.vue';
// @ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue';
// @ts-ignore
import ErrorTooltip from '@/components/ErrorTooltip/ErrorTooltip.vue';
// @ts-ignore
import MaxFeeAndSubmit from '@/components/MaxFeeAndSubmit/MaxFeeAndSubmit.vue';
import { TokenModel } from '@/core/database/entities/TokenModel';
// @ts-ignore
import TokenSelector from '@/components/TokenSelector/TokenSelector.vue';
import { Formatters } from '@/core/utils/Formatters';
import { NetworkConfigurationModel } from '@/core/database/entities/NetworkConfigurationModel';
import { TokenService } from '@/services/TokenService';
@Component({
    components: {
        ValidationObserver,
        ValidationProvider,
        FormWrapper,
        SignerSelector,
        SupplyInput,
        DivisibilityInput,
        DurationInput,
        ModalTransactionConfirmation,
        FormRow,
        ErrorTooltip,
        MaxFeeAndSubmit,
        TokenSelector,
    },
    computed: {
        ...mapGetters({
            tokens: 'token/tokens',
            holdTokens: 'token/holdTokens',
            currentHeight: 'network/currentHeight',
            networkConfiguration: 'network/networkConfiguration',
        }),
    },
})
export class FormTokenSupplyChangeTransactionTs extends FormTransactionBase {
    /**
     * Token hex Id
     * @type {string}
     */
    @Prop({ default: null }) tokenHexId: string;

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

    @Prop({
        default: false,
    })
    editMode: boolean;

    @Prop({
        default: () => ({}),
    })
    value: any;
    /**
     * Validation rules
     * @var {ValidationRuleset}
     */
    protected validationRules = ValidationRuleset;

    /**
     * Token supply change enum
     * @protected
     */
    protected TokenSupplyChangeAction = TokenSupplyChangeAction;

    /**
     * Form items
     * @protected
     * @var {Record<string, any>}
     */
    /**
     * Current network block height
     */
    private currentHeight: number;
    /**
     * Network Configs
     * @protected
     */
    public networkConfiguration: NetworkConfigurationModel;
    protected formItems = {
        tokenHexId: null,
        action: null,
        delta: null,
        maxFee: this.defaultFee,
    };

    /**
     * Tokens owned by the current account
     * @protected
     */
    private tokens: TokenModel[];
    private holdTokens: TokenModel[];

    /**
     * Current token info
     * @readonly
     * @protected
     */
    protected get currentTokenInfo(): TokenModel {
        if (this.formItems.tokenHexId) {
            return this.tokens.find(({ tokenIdHex }) => tokenIdHex === this.formItems.tokenHexId);
        }
    }

    /**
     * Current token relative supply
     * @readonly
     * @protected
     * @type {number}
     */
    protected get currentTokenRelativeSupply(): string | null {
        const currentTokenInfo = this.currentTokenInfo;
        if (!currentTokenInfo) {
            return;
        }
        const relative = currentTokenInfo.supply / Math.pow(10, currentTokenInfo.divisibility);
        return isNaN(relative) ? null : Formatters.formatNumber(relative, this.currentTokenInfo.divisibility);
    }

    /**
     * New absolute supply
     * @readonly
     * @protected
     * @type {(number | null)}
     */
    protected get newTokenAbsoluteSupply(): number | null {
        const currentTokenInfo = this.currentTokenInfo;
        if (currentTokenInfo === undefined) {
            return;
        }
        const newSupply =
            this.formItems.action === TokenSupplyChangeAction.Increase
                ? currentTokenInfo.supply + Number(this.formItems.delta)
                : currentTokenInfo.supply - Number(this.formItems.delta);

        return isNaN(newSupply) ? null : newSupply;
    }

    /**
     * New relative supply
     * @readonly
     * @protected
     * @type {(number | null)}
     */
    protected get newTokenRelativeSupply(): string | null {
        if (!this.newTokenAbsoluteSupply) {
            return;
        }
        const relative = this.newTokenAbsoluteSupply / Math.pow(10, this.currentTokenInfo.divisibility);
        return isNaN(relative) ? null : Formatters.formatNumber(relative, this.currentTokenInfo.divisibility);
    }

    /**
     * Reset the form with properties
     * @return {void}
     */
    protected resetForm(): void {
        if (this.editMode) {
            return;
        }

        // - re-populate form if transaction staged
        // if (this.stagedTransactions.length) {
        //   // @TODO: initialization from staged transactions
        //   this.isAwaitingSignature = true
        //   return
        // }

        // - set default form values
        this.formItems.tokenHexId = this.tokenHexId;
        this.formItems.action = TokenSupplyChangeAction.Increase;
        this.formItems.delta = 1;

        // - maxFee must be absolute
        this.formItems.maxFee = this.defaultFee;
    }

    /**
     * Getter for SUPPLY CHANGE transactions that will be staged
     * @see {FormTransactionBase}
     * @return {Transaction[]}
     */
    protected getTransactions(): Transaction[] {
        return [
            TokenSupplyChangeTransaction.create(
                this.createDeadline(),
                new TokenId(this.formItems.tokenHexId),
                this.formItems.action,
                UInt64.fromUint(this.formItems.delta),
                this.networkType,
                UInt64.fromUint(this.formItems.maxFee),
            ),
        ];
    }

    /**
     * Setter for TRANSFER transactions that will be staged
     * @see {FormTransactionBase}
     * @param {TransferTransaction[]} transactions
     * @throws {Error} If not overloaded in derivate component
     */
    protected setTransactions(transactions: Transaction[]) {
        // - this form creates 1 transaction
        const supplyChange = transactions.shift() as TokenSupplyChangeTransaction;

        // - populate from definition
        this.formItems.tokenHexId = supplyChange.tokenId.toHex();
        this.formItems.action = supplyChange.action;
        this.formItems.delta = supplyChange.delta.compact();

        // - populate maxFee
        this.formItems.maxFee = supplyChange.maxFee.compact();
    }

    get ownedTargetHexIds(): string[] {
        return this.holdTokens
            .filter((m) => m.ownerRawPlain === this.currentAccount.address && m.supplyMutable)
            .filter((entry) => {
                const expiration = TokenService.getExpiration(
                    entry,
                    this.currentHeight,
                    this.networkConfiguration.blockGenerationTargetTime,
                );
                return expiration !== 'expired';
            })
            .map(({ tokenIdHex }) => tokenIdHex);
    }

    public emitToAggregate() {
        if (this.getTransactions().length > 0) {
            this.$emit('txInput', this.formItems);
        }
    }

    mounted() {
        if (this.isAggregate && this.value) {
            Object.assign(this.formItems, this.value);
            this.formItems.action = this.value.action;
        }
    }
}
