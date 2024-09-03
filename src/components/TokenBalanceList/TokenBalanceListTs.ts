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
import { TokenId, NamespaceId } from 'bitxor-sdk';
import ImageExists from 'image-exists';
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

// internal dependencies
// @ts-ignore
import TokenAmountDisplay from '@/components/TokenAmountDisplay/TokenAmountDisplayNew.vue';
// resources
import { dashboardImages } from '@/views/resources/Images';
import { TokenService } from '@/services/TokenService';
import { AccountTokenConfigurationModel } from '@/core/database/entities/TokenConfigurationModel';
import { TokenModel } from '@/core/database/entities/TokenModel';
import { NetworkConfigurationModel } from '@/core/database/entities/NetworkConfigurationModel';
import { AccountModel } from '@/core/database/entities/AccountModel';
// @ts-ignore
import logobxr from '@/views/resources/img/bitxor/BXRCoin.png';
export interface BalanceEntry {
    id: TokenId;
    name: string;
    amount: number;
    token: TokenModel;
    price: number;
}

@Component({
    components: {
        TokenAmountDisplay,
    },
    computed: {
        ...mapGetters({
            accountTokenConfigurations: 'token/accountTokenConfigurations',
            balanceTokens: 'token/balanceTokens',
            networkToken: 'token/networkToken',
            currentHeight: 'network/currentHeight',
            networkConfiguration: 'network/networkConfiguration',
            currentAccount: 'account/currentAccount',
        }),
    },
})
export class TokenBalanceListTs extends Vue {
    public downloadimg(getname: string): string {
        //let imageex: ImageExists;

        let returntx;
        ImageExists('https://cdn.bitxor.io/coins/' + getname + '.png', function (exists) {
            if (exists) {
                returntx = 'https://cdn.bitxor.io/coins/' + getname + '.png';
            } else {
                returntx = logobxr;
            }
        });
        if (returntx != logobxr) {
            this.download = true;
        }
        return returntx;
    }
    public download: boolean = false;

    public downloaded() {
        return this.download;
    }
    public getImgUrl() {
        return logobxr;
    }
    public downloadimgb(getname: string): boolean {
        //let imageex: ImageExists;

        let returntx;
        ImageExists('https://cdn.bitxor.io/coins/' + getname + '.png', function (exists) {
            if (exists) {
                returntx = true;
            } else {
                returntx = false;
            }
        });

        return returntx;
    }

    /**
     * Dashboard images
     * @var {any}
     */
    protected dashboardImages: Record<string, any> = dashboardImages;

    /**
     * Networks 1currency token
     * @var {TokenId}
     */
    public networkToken: TokenId;

    /**
     * Network tokens info (all)
     * @var {TokenInfo[]}
     */
    public balanceTokens: TokenModel[];

    /**
     * List of tokens that are hidden
     * @var {string[]}
     */
    public accountTokenConfigurations: AccountTokenConfigurationModel;

    /**
     * Current account info
     */
    public currentAccount: AccountModel;
    /**
     * Whether the component is in edition mode
     * @var {boolean}
     */
    public isEditionMode: boolean = false;

    public currentHeight: number;

    private networkConfiguration: NetworkConfigurationModel;

    capitalizeFirstLetter(str) {
        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

        return capitalized;
    }
    /// region computed properties getter/setter
    /**
     * Balance entries from the currently active account's tokens
     * @readonly
     * @type {BalanceEntry}
     */
    // program to convert first letter of a string to uppercase

    get balanceEntries(): BalanceEntry[] {
        return this.balanceTokens.map((token) => {
            return {
                id: new TokenId(token.tokenIdHex),
                name: token.name ? this.capitalizeFirstLetter(token.name) : token.tokenIdHex,
                amount: token.balance || 0,
                token: token,
                price: token.lastprice,
            };
        });
    }

    /**
     * All balance entries except expired tokens
     * @readonly
     * @type {BalanceEntry[]}
     */
    get allBalanceEntries(): BalanceEntry[] {
        return this.balanceEntries.filter((entry) => {
            // calculate expiration
            const expiration = TokenService.getExpiration(
                entry.token,
                this.currentHeight,
                this.networkConfiguration.blockGenerationTargetTime,
            );
            // skip if token is expired
            return expiration !== 'expired';
        });
    }

    /**
     * Balance entries of active and not hidden tokens
     * @readonly
     * @type {BalanceEntry[]}
     */
    get filteredBalanceEntries(): BalanceEntry[] {
        // filter out hidden tokens
        return this.allBalanceEntries.filter((entry) => {
            return !this.isTokenHidden(entry.id);
        });
    }

    /// end-region computed properties getter/setter

    /**
     * Returns true when token \a tokenId is hidden
     * @param {TokenId} tokenId
     * @return {boolean}
     */
    public isTokenHidden(tokenId: TokenId | NamespaceId): boolean {
        const tokenConfiguration = this.accountTokenConfigurations[tokenId.toHex()];
        return tokenConfiguration && tokenConfiguration.hidden;
    }

    /**
     * Returns true if no token is hidden
     * @returns {boolean}
     */
    public areAllTokensShown(): boolean {
        return !Object.values(this.accountTokenConfigurations).find((c) => c.hidden);
    }

    /**
     * Toggle whether all tokens are shown or hidden
     * @return {void}
     */
    public toggleTokenDisplay(tokenId?: TokenId | NamespaceId) {
        // - clicked singular checkbox
        if (tokenId !== undefined) {
            const isHidden = this.isTokenHidden(tokenId);
            const action = isHidden ? 'SHOW_TOKEN' : 'HIDE_TOKEN';
            return this.$store.dispatch('token/' + action, { tokenId: tokenId, account: this.currentAccount });
        }

        // - update state
        const action = this.areAllTokensShown() ? 'HIDE_TOKEN' : 'SHOW_TOKEN';
        return this.balanceTokens.forEach((token) =>
            this.$store.dispatch('token/' + action, {
                tokenId: new TokenId(token.tokenIdHex),
                account: this.currentAccount,
            }),
        );
    }
}
