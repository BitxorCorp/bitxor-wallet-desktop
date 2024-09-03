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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Formatters } from '@/core/utils/Formatters';
import { mapGetters } from 'vuex';
import { AccountInfo, Address, TokenId, RepositoryFactory } from 'bitxor-sdk';
import { ProfileModel } from '@/core/database/entities/ProfileModel';
import { AccountService } from '@/services/AccountService';
// @ts-ignore
import TokenAmountDisplay from '@/components/TokenAmountDisplay/TokenAmountDisplay.vue';

@Component({
    components: {
        TokenAmountDisplay,
    },
    computed: {
        ...mapGetters({
            currentMnemonic: 'temporary/mnemonic',
            networkType: 'network/networkType',
            networkToken: 'token/networkToken',
            networkCurrency: 'token/networkCurrency',
            currentProfile: 'profile/currentProfile',
            currentPassword: 'temporary/password',
            addressesList: 'account/addressesList',
            optInAddressesList: 'account/optInAddressesList',
            selectedAccounts: 'account/selectedAddressesToInteract',
            optInSelectedAccounts: 'account/selectedAddressesOptInToInteract',
        }),
    },
})
export default class AccessLedgerTs extends Vue {
    /**
     * Formatting helpers
     * @protected
     */
    protected formatters = Formatters;
    /**
     * List of steps
     * @var {string[]}
     */
    public StepBarTitleList = ['create_profile', 'select_accounts', 'finish'];

    /**
     * Network's currency token id
     * @see {Store.Token}
     * @var {TokenId}
     */
    public networkToken: TokenId;

    /**
     * Currently active profile
     * @see {Store.Profile}
     * @var {string}
     */
    public currentProfile: ProfileModel;

    /**
     * Temporary stored mnemonic pass phrase
     * @see {Store.Temporary}
     * @var {MnemonicPassPhrase}
     */
    public currentMnemonic: string;

    /**
     * Account Service
     * @var {AccountService}
     */
    public accountService: AccountService;

    /**
     * List of addresses
     * @var {Address[]}
     */
    public addressesList: Address[];

    /**
     * List of opt in addresses
     * @var {Address[]}
     */
    public optInAddressesList: { address: Address; index: number }[];

    /**
     * Balances map
     * @var {any}
     */
    public addressTokenMap = {};

    /**
     * Map of selected accounts
     * @var {number[]}
     */
    public selectedAccounts: number[];

    /**
     * Map of selected accounts
     * @var {number[]}
     */
    public optInSelectedAccounts: number[];

    /**
     * Indicates if account balance and addresses are already fetched
     */
    private initialized: boolean = false;
    private optInInitialized: boolean = false;

    /**
     * Hook called when the page is mounted
     * @return {void}
     */
    async mounted() {
        this.accountService = new AccountService();
        await this.$store.dispatch('temporary/initialize');
        this.$store.commit('account/resetSelectedAddressesToInteract');
        this.$store.commit('account/resetSelectedAddressesOptInToInteract');
    }

    /**
     * Error notification handler
     */
    private errorNotificationHandler(error: any) {
        if (error.message && error.message.includes('cannot open device with path')) {
            error.errorCode = 'ledger_connected_other_app';
        }
        if (error.message && error.message.includes('A transfer error')) {
            return;
        }
        if (error.errorCode) {
            switch (error.errorCode) {
                case 'NoDevice':
                    this.$store.dispatch('notification/ADD_ERROR', 'ledger_no_device');
                    return;
                case 'ledger_not_supported_app':
                    this.$store.dispatch('notification/ADD_ERROR', 'ledger_not_supported_app');
                    return;
                case 'ledger_connected_other_app':
                    this.$store.dispatch('notification/ADD_ERROR', 'ledger_connected_other_app');
                    return;
                case 26628:
                    this.$store.dispatch('notification/ADD_ERROR', 'ledger_device_locked');
                    return;
                case 26368:
                case 27904:
                    this.$store.dispatch('notification/ADD_ERROR', 'ledger_not_opened_app');
                    return;
                case 27264:
                    this.$store.dispatch('notification/ADD_ERROR', 'ledger_not_using_bxr_app');
                    return;
                case 27013:
                    this.$store.dispatch('notification/ADD_ERROR', 'ledger_user_reject_request');
                    return;
            }
        } else if (error.name) {
            switch (error.name) {
                case 'TransportOpenUserCancelled':
                    this.$store.dispatch('notification/ADD_ERROR', 'ledger_no_device_selected');
                    return;
            }
        }
        this.$store.dispatch('notification/ADD_ERROR', this.$t('create_profile_failed', { reason: error.message || error }));
    }

    @Watch('selectedAccounts')
    /**
     * Fetch account balances and map to address
     * @return {void}
     */
    private async initAccounts() {
        try {
            if (this.initialized || !this.selectedAccounts.length) {
                return;
            }

            // fetch accounts info
            const repositoryFactory = this.$store.getters['network/repositoryFactory'] as RepositoryFactory;
            if (repositoryFactory) {
                const accountsInfo = await repositoryFactory.createAccountRepository().getAccountsInfo(this.addressesList).toPromise();
                // map balances
                this.addressTokenMap = {
                    ...this.addressTokenMap,
                    ...this.mapBalanceByAddress(accountsInfo, this.networkToken),
                };
            } else {
                this.$store.dispatch('notification/ADD_ERROR', 'bitxor_node_cannot_connect');
                return;
            }

            this.initialized = true;
        } catch (error) {
            this.errorNotificationHandler(error);
        }
    }

    /**
     * Fetch account balances and map to address
     * @return {void}
     */
    @Watch('optInSelectedAccounts')
    private async initOptInAccounts(): Promise<void> {
        try {
            if (this.optInInitialized || !this.optInSelectedAccounts.length) {
                return;
            }

            // whitelist opt in accounts
            if (this.optInAddressesList.length === 0) {
                return;
            }
            const optInAddresses = this.optInAddressesList.map((account) => account.address);

            // fetch accounts info
            const repositoryFactory = this.$store.getters['network/repositoryFactory'] as RepositoryFactory;
            if (repositoryFactory) {
                const accountsInfo = await repositoryFactory.createAccountRepository().getAccountsInfo(optInAddresses).toPromise();
                // map balances
                this.addressTokenMap = {
                    ...this.addressTokenMap,
                    ...this.mapBalanceByAddress(accountsInfo, this.networkToken),
                };
            } else {
                this.$store.dispatch('notification/ADD_ERROR', 'bitxor_node_cannot_connect');
                return;
            }

            this.optInInitialized = true;
        } catch (error) {
            this.errorNotificationHandler(error);
        }
    }

    public mapBalanceByAddress(accountsInfo: AccountInfo[], token: TokenId): Record<string, number> {
        return accountsInfo
            .map(({ tokens, address }) => {
                // - check balance
                const hasNetworkToken = tokens.find((tokenOwned) => tokenOwned.id.equals(token));

                // - account doesn't hold network token so the balance is zero
                if (hasNetworkToken === undefined) {
                    return {
                        address: address.plain(),
                        balance: 0,
                    };
                }
                // - map balance to address
                const balance = hasNetworkToken.amount.compact();
                return {
                    address: address.plain(),
                    balance: balance,
                };
            })
            .reduce((acc, { address, balance }) => ({ ...acc, [address]: balance }), {});
    }

    public getCurrentStep(): number {
        switch (this.$route.name) {
            default:
            case 'profiles.accessLedger.info':
                return 0;
            case 'profiles.accessLedger.walletSelection':
                return 1;
            case 'profiles.accessLedger.finalize':
                return 2;
        }
    }

    public getStepClassName(index: number): string {
        return this.getCurrentStep() == index ? 'active' : this.getCurrentStep() > index ? 'done' : '';
    }

    /**
     * Called when clicking on an address to remove it from the selection
     * @protected
     * @param {number} pathNumber
     */
    protected onRemoveAddress(pathNumber: number): void {
        this.$store.commit('account/removeFromSelectedAddressesToInteract', pathNumber);
    }
    /**
     * Called when clicking on an address to remove it from the selection
     * @protected
     * @param {number} pathNumber
     */
    protected onRemoveOptInAddress(pathNumber: number): void {
        this.$store.commit('account/removeFromSelectedAddressesOptInToInteract', pathNumber);
    }
}
