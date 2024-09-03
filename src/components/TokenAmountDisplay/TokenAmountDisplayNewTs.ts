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
import { mapGetters } from 'vuex';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TokenId, NamespaceId, NetworkType } from 'bitxor-sdk';
// internal dependencies
// configuration
// child components
// @ts-ignore
import AmountDisplay from '@/components/AmountDisplay/AmountDisplay.vue';
import { TokenModel } from '@/core/database/entities/TokenModel';
import { NetworkCurrencyModel } from '@/core/database/entities/NetworkCurrencyModel';
import { networkConfig } from '@/config';

@Component({
    components: { AmountDisplay },
    computed: {
        ...mapGetters({
            tokens: 'token/tokens',
            networkCurrency: 'token/networkCurrency',
            networkType: 'network/networkType',
        }),
    },
})
export class TokenAmountDisplayNewTs extends Vue {
    @Prop({
        default: null,
    })
    id: TokenId | NamespaceId;

    @Prop({
        default: null,
    })
    relativeAmount: number;

    @Prop({
        default: null,
    })
    absoluteAmount: number;
    @Prop({
        default: null,
    })
    absolutePrice: number;

    @Prop({
        default: 'green',
    })
    color: 'red' | 'green';

    @Prop({
        default: 'normal',
    })
    size: 'normal' | 'smaller' | 'bigger' | 'biggest';

    @Prop({
        default: false,
    })
    showTicker: false;

    private tokens: TokenModel[];

    private networkCurrency: NetworkCurrencyModel;

    private networkType: NetworkType;

    /// region computed properties getter/setter

    private useNetwork(): boolean {
        if (!this.id) {
            return !!this.networkCurrency;
        }
        if (this.networkCurrency && this.id.toHex() === this.networkCurrency.tokenIdHex) {
            return true;
        }
        if (this.networkCurrency && this.id.toHex() === this.networkCurrency.namespaceIdHex) {
            return true;
        }
        return false;
    }

    /**
     * Token divisibility from database
     * @return {number}
     */
    protected get divisibility(): number {
        if (this.useNetwork()) {
            return this.networkCurrency.divisibility;
        }
        // TODO improve how to resolve the token id when the known value is a namespace id.
        // Note that if the transaction is old, the namespace id of the token may have been expired!
        const token = this.tokens.find((m) => m.tokenIdHex === this.id.toHex());
        return token ? token.divisibility : networkConfig[this.networkType].maxTokenDivisibility;
    }

    public get amount(): number {
        if (this.absoluteAmount) {
            return this.absoluteAmount / Math.pow(10, this.divisibility);
        } else {
            return this.relativeAmount || 0;
        }
    }
    public get price(): number {
        if (this.absolutePrice) {
            return this.amount * this.absolutePrice;
        } else {
            return 0;
        }
    }

    public get ticker(): string {
        if (!this.showTicker) {
            return '';
        }

        if (this.useNetwork()) {
            return this.networkCurrency.ticker || '';
        }

        const token = this.tokens.find((m) => m.tokenIdHex === this.id.toHex());
        return (token && token.name) || this.id.toHex();
    }

    /// end-region computed properties getter/setter
}
