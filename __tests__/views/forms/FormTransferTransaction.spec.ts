import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import i18n from '@/language';
import VueI18n from 'vue-i18n';
import { NetworkConfigurationModel } from '@/core/database/entities/NetworkConfigurationModel';

//@ts-ignore
import FormTransferTransaction from '@/views/forms/FormTransferTransaction/FormTransferTransaction.vue';
import { WalletsModel1 } from '@MOCKS/Accounts';
import { networkMock } from '@MOCKS/network';
import { PublicAccount, TokenId, Address, NetworkType } from 'bitxor-sdk';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);
localVue.use(VueRouter);

/* fake store */
const networkModule = {
    namespaced: true,
    getters: {
        currentHeight: () => 100,
        feesConfig: () => networkMock.fees,
        networkConfiguration: () => new NetworkConfigurationModel(),
        epochAdjustment: () => 0,
        networkType: () => NetworkType.TEST_NET,
    },
};

const tokenModule = {
    namespaced: true,
    getters: {
        balanceTokens: () => [
            {
                tokenIdHex: networkMock.currency.tokenIdHex,
                balance: 0,
            },
        ],
        tokens: () => [],
        networkToken: () => new TokenId(networkMock.currency.tokenIdHex),
        networkCurrency: () => {
            return {
                tokenIdHex: networkMock.currency.tokenIdHex,
                namespaceIdHex: networkMock.currency.tokenIdHex,
                namespaceIdFullname: networkMock.currency.name,
                divisibility: networkMock.currency.divisibility,
                transferable: networkMock.currency.transferable,
                supplyMutable: networkMock.currency.supplyMutable,
                restrictable: networkMock.currency.restrictable,
                ticker: networkMock.currency.name,
            };
        },
    },
};

const accountModule = {
    namespaced: true,
    getters: {
        currentAccount: () => WalletsModel1,
        knownAccounts: () => [WalletsModel1],
        currentRecipient: () => PublicAccount.createFromPublicKey('0'.repeat(64), 152),
        currentSigner: () => {
            return {
                label: 'test-1',
                address: Address.createFromRawAddress(WalletsModel1.address),
                multisig: WalletsModel1.isMultisig,
                requiredCosignatures: 0,
            };
        },
    },
};

const appModule = {
    namespaced: true,
    getters: {
        defaultFee: () => networkMock.fees,
    },
};

const store = new Vuex.Store({
    modules: {
        network: networkModule,
        token: tokenModule,
        account: accountModule,
        app: appModule,
    },
});
store.commit = jest.fn();
store.dispatch = jest.fn();

const router = new VueRouter();

const options = {
    localVue,
    i18n,
    store,
    router,
};
let wrapper;
let vm;
beforeEach(() => {
    wrapper = shallowMount(FormTransferTransaction, options);
    vm = wrapper.vm;
});
afterEach(() => {
    wrapper.destroy();
    vm = undefined;
});

describe('FormTransferTransaction', () => {
    it('getTransactions method should return correct absolut amount (network currency).', async () => {
        // arrange
        const amount = '1.123456';
        wrapper.setData({
            formItems: {
                attachedTokens: [
                    {
                        uid: 123,
                        tokenHex: networkMock.currency.tokenIdHex,
                        amount,
                    },
                ],
            },
        });

        // act
        const tx = vm.getTransactions();

        // assert
        expect(Number(amount) * Math.pow(10, networkMock.currency.divisibility)).toBe(tx[0].tokens[0].amount.compact());
    });
});
