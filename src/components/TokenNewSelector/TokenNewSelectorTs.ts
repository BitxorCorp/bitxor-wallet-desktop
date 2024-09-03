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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { TokenModel } from '@/core/database/entities/TokenModel';
// child components
import { ValidationProvider } from 'vee-validate';
// @ts-ignore
import ErrorTooltip from '@/components/ErrorTooltip/ErrorTooltip.vue';
// @ts-ignore
import FormRow from '@/components/FormRowNew/FormRowNew.vue';
import { Signer } from '@/store/Account';
@Component({
    components: {
        ValidationProvider,
        ErrorTooltip,
        FormRow,
    },
    computed: {
        ...mapGetters({
            holdTokens: 'token/holdTokens',
            currentSigner: 'account/currentSigner',
        }),
    },
})
export class TokenNewSelectorTs extends Vue {
    /**
     * Field label
     * @type {string}
     */
    @Prop({ default: '' }) label: string;

    /**
     * Value set by the parent component's v-model
     * @type {string}
     */
    @Prop({ default: null }) value: string;

    /**
     * Namespaces that are not linked
     * @type {boolean}
     */
    @Prop({ default: false }) disableLinked: boolean;

    /**
     * Namespaces that are linked to an alias
     * @type {boolean}
     */
    @Prop({ default: false }) disableUnlinked: boolean;

    /**
     * Level 1,2 namespace
     * @type {boolean}
     */
    @Prop({ default: false }) onlyowner: boolean;

    /**
     * Level 3 namespace
     * @type {boolean}
     */
    @Prop({ default: false }) onlybps: boolean;

    /**
     * Disabled namespace selector
     */
    @Prop({ default: false }) disabled: boolean;

    /**
     * Namespaces names
     * @type {[h: string]: string}
     */
    public holdTokens: TokenModel[];
    /**
     * Filter Namespaces
     */
    get filteredTokens() {
        if (this.disableLinked) {
            return this.linkableTokens;
        }
        if (this.disableUnlinked) {
            return this.unlinkableTokens;
        }
        if (this.onlyowner) {
            return this.ownerTokens;
        }
        if (this.onlybps) {
            return this.onlybpsTokens;
        }
        return this.allTokens;
    }

    /**
     * Namespaces that are not linked
     */
    get linkableTokens() {
        return this.holdTokens.filter((n) => n.name === '');
    }

    /**
     * Namespaces that are linked to an alias
     */
    get unlinkableTokens() {
        return this.holdTokens.filter((n) => n.name !== '');
    }

    /**
     * Filter out of level 3 when creating a subnamespace
     */
    get ownerTokens() {
        return this.holdTokens.filter((n) => n.name !== '');
    }
    private currentSigner: Signer;
    /**
     * Filter level 3 subnamespace
     */
    get onlybpsTokens() {
        return this.holdTokens.filter((n) => n.name && n.duration === 0 && n.transferable === true && !n.isCurrencyToken && n.ownerRawPlain === this.currentSigner.address.plain());
    }

    /**
     * all namespaces
     */
    get allTokens() {
        return this.holdTokens;
    }

    /// region computed properties getter/setter
    /**
     * Value set by the parent component
     * @type {string}
     */
    get chosenValue(): string {
        return this.value;
    }

    /**
     * Emit value change
     */
    set chosenValue(newValue: string) {
        this.$emit('input', newValue);
    }

    /// end-region computed properties getter/setter
    /**
     * Helper method to read namespace name if available
     * @param {TokenModel} info
     * @return {string}
     */
    public getName(info: TokenModel): string {
        return info.name || info.tokenIdHex;
    }

    /**
     * Hook called when the layout is mounted
     * @return {void}
     */
    public mounted(): void {
        // set default value to the first namespace in the list
        if (this.filteredTokens.length) {
            this.chosenValue = this.getName(this.filteredTokens[0]);
        }
    }
}
