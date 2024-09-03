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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// child components
import { ValidationObserver } from 'vee-validate';
// @ts-ignore
import TokenSelector from '@/components/TokenSelector/TokenSelector.vue';
// @ts-ignore
import AmountInput from '@/components/AmountInput/AmountInput.vue';
// @ts-ignore
import ButtonRemove from '@/components/ButtonRemove/ButtonRemove.vue';
// @ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue';
import { Formatters } from '@/core/utils/Formatters';

@Component({
    components: {
        ValidationObserver,
        TokenSelector,
        AmountInput,
        ButtonRemove,
        FormRow,
    },
})
export class TokenAttachmentInputTs extends Vue {
    /**
     * Initial value set by the parent
     * @type {{tokenHex: string, amount: number}}
     */
    @Prop({
        default: { tokenHex: '', amount: 0 },
        required: true,
    })
    tokenAttachment: { tokenHex: string; amount: string };

    /**
     * Unique Id assigned to this component
     * @type {number}
     */
    @Prop({ default: 0, required: true }) uid: number;

    /**
     * Hex ids of tokens to show in options
     * @type {string[]}
     */
    @Prop({ default: [] }) tokenHexIds: string[];

    /**
     * Whether to show absolute amounts or not
     */
    @Prop({ default: false }) absolute: boolean;

    /**
     * the item index in the Array
     */
    @Prop({ default: true }) isShowDelete: boolean;

    /**
     * True if the user is in offline mode
     */
    @Prop({ default: false }) isOffline: boolean;

    /**
     * whether to show the label accord to isFirstItem
     */
    @Prop({ default: true }) isFirstItem: boolean;
    @Prop({ default: 0 }) selectedFeeValue: number;
    @Prop({ default: false }) isAggregate: boolean;

    /**
     * Updated value to sync with the parent formItems
     * @protected
     * @type {{tokenHex: string, amount: number}}
     */
    protected get chosenValue(): { tokenHex: string; amount: string } {
        if (navigator.languages != undefined) {
            const decimalSeparator = Formatters.getDecimalSeparator(navigator.languages[0]);
            if (decimalSeparator !== ',') {
                this.tokenAttachment.amount = this.tokenAttachment.amount.replace(',', '');
            }
        }
        return this.tokenAttachment;
    }

    /**
     * Handle token changes from token selection fields
     * @param {string} hex
     */
    public onChangeToken(hex: string): void {
        Vue.set(this.chosenValue, 'tokenHex', hex);
        Vue.nextTick().then(() => this.emitChange());
    }

    /**
     * Handle amount changes from token selection fields
     * @param {number} amount
     */
    public onChangeAmount(amount: number): void {
        Vue.set(this.chosenValue, 'amount', amount);
        Vue.nextTick().then(() => this.emitChange());
    }

    /**
     * Emits input change to the parent
     * @private
     * @return {void}
     */
    private emitChange(): void {
        this.$emit('input-changed', {
            tokenAttachment: this.chosenValue,
            inputIndex: this.uid,
        });
    }

    /**
     * Form items
     * @var {any}
     */
    public formItems = {
        selectedTokenHex: '',
        relativeAmount: this.chosenValue?.amount || '0',
    };

    get selectedToken(): string {
        return this.formItems.selectedTokenHex;
    }

    set selectedToken(hex: string) {
        this.formItems.selectedTokenHex = hex;
    }

    get relativeAmount(): string {
        return this.formItems.relativeAmount;
    }

    set relativeAmount(amount: string) {
        this.formItems.relativeAmount = amount;
    }

    get canClickAdd(): boolean {
        if (!this.formItems.selectedTokenHex || undefined === this.formItems.relativeAmount) {
            return false;
        }

        return true;
    }
    /// end-region computed properties getter/setter

    mounted() {
        this.emitChange();
    }

    @Watch('tokenAttachment')
    public onTokenAttachmentChange(tokenAttachment: { tokenHex: string; amount: string }) {
        this.relativeAmount = tokenAttachment.amount;
    }
}
