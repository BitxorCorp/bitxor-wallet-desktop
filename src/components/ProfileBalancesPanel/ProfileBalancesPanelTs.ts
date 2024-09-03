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
import { Address } from 'bitxor-sdk';
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { RESTService } from '@/services/RESTService';
// child components
// @ts-ignore
import TokenAmountDisplay from '@/components/TokenAmountDisplay/TokenAmountDisplayNew.vue';
// @ts-ignore
import TokenBalanceList from '@/components/TokenBalanceList/TokenBalanceList.vue';
//@ts-ignore
import ButtonCopyToClipboard from '@/components/ButtonCopyToClipboard/ButtonCopyToClipboard.vue';
import { TokenModel } from '@/core/database/entities/TokenModel';
import { NetworkCurrencyModel } from '@/core/database/entities/NetworkCurrencyModel';

@Component({
    components: {
        TokenAmountDisplay,
        TokenBalanceList,
        ButtonCopyToClipboard,
    },
    computed: {
        ...mapGetters({
            currentSignerAddress: 'account/currentSignerAddress',
            balanceTokens: 'token/balanceTokens',
            isCosignatoryMode: 'account/isCosignatoryMode',
            networkCurrency: 'token/networkCurrency',
        }),
    },
})
export class ProfileBalancesPanelTs extends Vue {
    /**
     * Currently active signer
     * @var {any}
     */
    public currentSignerAddress: Address;

    /**
     * Currently active account's balances
     * @var {Token[]}
     */
    public balanceTokens: TokenModel[];

    /**
     * Whether currently active account is in cosignatory mode
     * @var {boolean}
     */
    public isCosignatoryMode: boolean;

    /**
     * Networks currency token
     * @var {TokenId}
     */
    public networkCurrency: NetworkCurrencyModel;

    public async created() {
        this.$store.dispatch('token/LOAD_TOKENS');
    }
    public async getpricek(idtoken: string) {
        return (await RESTService.getPrefixToken(idtoken))
            ? await RESTService.getPrice(await RESTService.getPrefixToken(idtoken), 'USD')
            : 0;
    }
    public async getprice(balanceTokens: TokenModel[]) {
        const networkTokenData = balanceTokens.filter((m) => m.isCurrencyToken).find((i) => i);
        const price = networkTokenData
            ? await RESTService.getPrice(await RESTService.getPrefixToken(networkTokenData.tokenIdHex), 'USD')
            : 0;
        return price;
    }
    public get absoluteBalance() {
        let sum = 0;
        const networkTokenData = this.balanceTokens.filter((m) => m.isCurrencyToken).find((i) => i);
        const number = Math.floor(networkTokenData.balance);
        this.balanceTokens.forEach((obj) => {
            if (obj.isCurrencyToken) {
                sum += obj.balance;
            } else {
                if (obj.lastprice > 0) {
                    sum +=
                        (((obj.balance / Math.pow(10, obj.divisibility)) * obj.lastprice) / networkTokenData.lastprice) *
                        Math.pow(10, networkTokenData.divisibility);
                }
            }
        });

        return sum;
    }
    public get absolutePrice() {
        const networkTokenData = this.balanceTokens.filter((m) => m.isCurrencyToken).find((i) => i);
        return (networkTokenData && networkTokenData.lastprice) || 0;
    }
}
