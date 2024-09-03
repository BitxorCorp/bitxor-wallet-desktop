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
import { TokenId } from 'bitxor-sdk';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
// internal dependencies
// child components
import { ValidationProvider } from 'vee-validate';
// @ts-ignore
import ErrorTooltip from '@/components//ErrorTooltip/ErrorTooltip.vue';
// @ts-ignore
import FormLabel from '@/components//FormLabel/FormLabel.vue';
import { TokenModel } from '@/core/database/entities/TokenModel';

@Component({
    components: {
        ValidationProvider,
        ErrorTooltip,
        FormLabel,
    },
    computed: {
        ...mapGetters({
            networkToken: 'token/networkToken',
            networkTokenName: 'token/networkTokenName',
            balanceTokens: 'token/balanceTokens',
            holdTokens: 'token/holdTokens',
        }),
    },
})
export class TokenSelectorTs extends Vue {
    /**
     * Prop bound to the parent v-model
     */
    @Prop({ default: '' }) value: string;

    /**
     * Tokens to display as options
     */
    @Prop({ default: [] }) tokenHexIds: string[];

    /**
     * Field label hidden by default
     */
    @Prop({ default: null }) label: string;

    /**
     * Disable token selector
     */
    @Prop({ default: false }) disabled: boolean;

    @Prop({ default: 'networkToken' }) defaultToken: 'networkToken' | 'firstInList';
    /**
     * Networks currency token
     */
    public networkToken: TokenId;

    /**
     * Networks currency token name
     */
    public networkTokenName: string;

    /**
     * All the known tokens.
     */

    public balanceTokens: TokenModel[];
    public holdTokens: TokenModel[];

    /// region computed properties getter/setter

    /**
     * Tokens shown as options in the select
     * @readonly
     * @protected
     */
    protected get displayedTokens(): TokenModel[] {
        if (this.$route.fullPath === '/aggregate/supply') {
            return this.tokenHexIds.map((tokenIdHex) => this.holdTokens.find((m) => m.tokenIdHex === tokenIdHex)).filter((x) => x);
        }
        return this.tokenHexIds.map((tokenIdHex) => this.balanceTokens.find((m) => m.tokenIdHex === tokenIdHex)).filter((x) => x);
    }

    /**
     * Sets the default input value
     * @type {string}
     */
    public get selectedToken(): string {
        return this.value;
    }

    /**
     * Emits input value change to parent component
     */
    public set selectedToken(hex: string) {
        this.$emit('input', hex);
    }

    /**
     * Hook called when the layout is mounted
     * @return {void}
     */
    public mounted(): void {
        // if a value is provided, return
        if (this.value && this.value.length > 0) {
            return;
        }

        // else... set default value to network token
        if (this.defaultToken === 'networkToken' && this.networkToken) {
            this.selectedToken = this.networkToken.toHex();
        }

        // otherwise... set default value to the first token from the props
        if (this.defaultToken === 'firstInList' && this.tokenHexIds.length) {
            this.selectedToken = this.tokenHexIds[0];
        }
    }
}
