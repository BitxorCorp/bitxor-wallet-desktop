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
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { TokenId, NetworkType } from 'bitxor-sdk';
import { ValidationProvider } from 'vee-validate';
// internal dependencies
import { ProfileModel } from '@/core/database/entities/ProfileModel';
import { AccountModel, AccountType } from '@/core/database/entities/AccountModel';
import { AccountService } from '@/services/AccountService';
import { ValidationRuleset } from '@/core/validation/ValidationRuleset';
// child components
// @ts-ignore
import TokenAmountDisplay from '@/components/TokenAmountDisplay/TokenAmountDisplay.vue';
// @ts-ignore
import ErrorTooltip from '@/components/ErrorTooltip/ErrorTooltip.vue';
// @ts-ignore
import FormLabel from '@/components/FormLabel/FormLabel.vue';
// @ts-ignore
import ModalFormSubAccountCreation from '@/views/modals/ModalFormSubAccountCreation/ModalFormSubAccountCreation.vue';
// @ts-ignore
import AmountDisplay from '@/components/AmountDisplay/AmountDisplay.vue';
// @ts-ignore
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks.vue';
// @ts-ignore
import ModalBackupProfile from '@/views/modals/ModalBackupProfile/ModalBackupProfile.vue';
import { NetworkCurrencyModel } from '@/core/database/entities/NetworkCurrencyModel';
import { TokenModel } from '@/core/database/entities/TokenModel';

@Component({
    components: {
        TokenAmountDisplay,
        ModalFormSubAccountCreation,
        ErrorTooltip,
        FormLabel,
        ValidationProvider,
        AmountDisplay,
        ModalBackupProfile,
        NavigationLinks,
    },
    computed: {
        ...mapGetters({
            currentProfile: 'profile/currentProfile',
            currentAccount: 'account/currentAccount',
            knownAccounts: 'account/knownAccounts',
            networkType: 'network/networkType',
            tokens: 'token/tokens',
            networkToken: 'token/networkToken',
            networkCurrency: 'token/networkCurrency',
            isPrivateKeyProfile: 'profile/isPrivateKeyProfile',
        }),
    },
})
export class AccountSelectorPanelTs extends Vue {
    /**
     * The network currency.
     */
    public networkCurrency: NetworkCurrencyModel;

    /**
     * Currently active networkType
     * @see {Store.Network}
     * @var {NetworkType}
     */
    public networkType: NetworkType;

    /**
     * Currently active profile
     * @see {Store.Profile}
     * @var {ProfileModel}
     */
    public currentProfile: ProfileModel;

    /**
     * Currently active account
     * @see {Store.Account}
     * @var {AccountModel}
     */
    public currentAccount: AccountModel;

    /**
     * Known accounts identifiers
     * @var {string[]}
     */
    public knownAccounts: AccountModel[];
    /**
     * Networks currency token
     * @var {TokenId}
     */
    public networkToken: TokenId;

    /**
     * Current account owned tokens
     * @private
     * @type {TokenInfo[]}
     */
    private tokens: TokenModel[];

    /**
     * Accounts repository
     * @var {AccountService}
     */
    public accountService: AccountService;

    /**
     * Whether user is currently adding an account (modal)
     * @var {boolean}
     */
    public isAddingAccount: boolean = false;
    /**
     * Whether currently viewing export
     * @var {boolean}
     */
    public isViewingExportModal: boolean = false;

    /**
     * Validation rules
     * @var {ValidationRuleset}
     */
    public validationRules = ValidationRuleset;

    public isPrivateKeyProfile: boolean;

    /**
     * Hook called when the component is created
     * @return {void}
     */
    public async created() {
        this.accountService = new AccountService();
    }

    /// region computed properties getter/setter
    public get balances(): Map<string, number> {
        const networkTokens = this.tokens.filter((m) => m.tokenIdHex === this.networkToken.toHex());
        return Object.assign({}, ...networkTokens.map((s) => ({ [s.addressRawPlain]: s.balance })));
        // return this.addressesBalances
    }

    public get currentAccountIdentifier(): string {
        return !this.currentAccount ? '' : this.currentAccount.id;
    }

    public set currentAccountIdentifier(id: string) {
        if (!id || !id.length) {
            return;
        }

        const account = this.accountService.getAccount(id);
        if (!account) {
            return;
        }

        if (!this.currentAccount || id !== this.currentAccount.id) {
            this.$store.dispatch('account/SET_CURRENT_ACCOUNT', account);
            this.$emit('input', account.id);
        }
    }

    public get currentAccounts(): AccountModel[] {
        return this.knownAccounts;
    }

    public get seedAccounts(): AccountModel[] {
        return this.knownAccounts.filter((_) => _.type === AccountType.SEED);
    }

    public get optInAccounts(): AccountModel[] {
        return this.knownAccounts.filter((_) => _.type === AccountType.OPT_IN);
    }

    public get pkAccounts(): AccountModel[] {
        return this.knownAccounts.filter((_) => _.type === AccountType.PRIVATE_KEY);
    }

    public get ledgerAccount(): AccountModel[] {
        return this.knownAccounts.filter((_) => _.type === AccountType.LEDGER);
    }

    public get ledgerOptInAccount(): AccountModel[] {
        return this.knownAccounts.filter((_) => _.type === AccountType.LEDGER_OPT_IN);
    }

    public get hasAddAccountModal(): boolean {
        return this.isAddingAccount;
    }

    public set hasAddAccountModal(f: boolean) {
        this.isAddingAccount = f;
    }

    public get hasBackupProfileModal(): boolean {
        return this.isViewingExportModal;
    }

    public set hasBackupProfileModal(f: boolean) {
        this.isViewingExportModal = f;
    }

    /// end-region computed properties getter/setter

    /**
     * Whether the account item is the current account
     * @param item
     * @return {boolean}
     */
    public isActiveAccount(item): boolean {
        return item.id === this.currentAccount.id;
    }
}
