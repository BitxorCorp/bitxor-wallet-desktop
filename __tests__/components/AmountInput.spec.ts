//@ts-ignore
import AmountInput from '@/components/AmountInput/AmountInput.vue';
import { ValidationProvider, extend, validate } from 'vee-validate';

import { tokensMock } from '@MOCKS/tokens';
import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import VueI18n, { Values } from 'vue-i18n';
import i18n from '@/language/index';
import { StandardValidationRules } from '@/core/validation/StandardValidationRules';
import { MaxDecimalsValidator, PositiveDecimalNumberValidator, MaxRelativeAmountValidator } from '@/core/validation/validators';
import { appConfig } from '@/config';
import { NetworkConfigurationModel } from '@/core/database/entities/NetworkConfigurationModel';
import { StartsWithZeroValidator } from '@/core/validation/validators/StartsWithZeroValidator';

StandardValidationRules.register();
appConfig.constants.DECIMAL_SEPARATOR = '.';
extend('maxDecimals', {
    validate: (value, args: any) => {
        const { maxDecimalNumber } = args;
        return MaxDecimalsValidator.validate(value, maxDecimalNumber);
    },
    message: (_fieldName: string, values: Values) => `${i18n.t('max_decimal_number_error', values)}`,
    params: ['maxDecimalNumber'],
});
extend('positiveDecimal', {
    validate: (value) => PositiveDecimalNumberValidator.validate(value),
    message: () => i18n.t('positive_decimal_error', { decimalSeparator: appConfig.constants.DECIMAL_SEPARATOR }).toString(),
});
extend('startsWithZero', {
    validate: (value) => StartsWithZeroValidator.validate(value),
    message: () => i18n.t('amount_value_cannot_start_with_zero').toString(),
});
extend('maxRelativeAmount', {
    validate: (value, { maxTokenAtomicUnits, maxTokenDivisibility }: any) => {
        const maxRelativeAmount =
            maxTokenDivisibility === 0 ? maxTokenAtomicUnits : maxTokenAtomicUnits / Math.pow(10, maxTokenDivisibility);
        return MaxRelativeAmountValidator.validate(value, maxRelativeAmount);
    },
    message: (_fieldName: string, values: Values) =>
        `${i18n.t('max_amount_error', {
            ...values,
            maxRelativeAmount: `${
                values['maxTokenAtomicUnits'] === 0
                    ? values['maxTokenAtomicUnits']
                    : values['maxTokenAtomicUnits'] / Math.pow(10, values['maxTokenDivisibility'])
            }`,
        })}`,
    params: ['maxTokenAtomicUnits', 'maxTokenDivisibility'],
});
const localVue = createLocalVue();
localVue.component('ValidationProvider', ValidationProvider);
localVue.use(Vuex);
localVue.use(VueI18n);
const tokenModule = {
    namespaced: true,
    getters: {
        tokens: () => {
            return tokensMock;
        },
        balanceTokens: () => {
            return tokensMock;
        },
    },
};

const networkModule = {
    namespaced: true,
    getters: {
        networkConfiguration: () => new NetworkConfigurationModel(),
    },
};

const store = new Vuex.Store({
    modules: {
        token: tokenModule,
        network: networkModule,
    },
});
const options = {
    localVue,
    i18n,
    store,
    propsData: {
        tokenHex: '519FC24B9223E0B4',
    },
    stubs: ['Tooltip'],
    sync: false,
};
const options2 = {
    localVue,
    i18n,
    store,
    propsData: {
        tokenHex: '534CD11F6D984B4B',
    },
    stubs: ['Tooltip'],
    sync: false,
};
let wrapper;
let wrapper2;

describe('AmountInput', () => {
    beforeEach(() => {
        wrapper = mount(AmountInput, options);
        wrapper2 = mount(AmountInput, options2);
    });
    afterEach(() => {
        wrapper.destroy();
        wrapper2 = mount(AmountInput, options2);
    });
    test.skip('input correctly', async () => {
        wrapper.setProps({
            value: '10.12345678',
        });
        await flushPromises();
        expect((wrapper.vm as AmountInput).relativeValue).toBe('10.12345678');
    });
    test.skip('output correctly', async () => {
        wrapper.find('.input-style').setValue('10.1234567');
        await flushPromises();
        expect(wrapper.emitted().input[0]).toEqual(['10.1234567']);
    });
    test("divisibility of the token '519FC24B9223E0B4' is 6", async () => {
        const rule = wrapper.vm.validationRules.amount;
        const falseResult = await validate('10.1234567', rule);
        expect(falseResult.valid).toBeFalsy();
        const rightResult = await validate('10.123456', rule);
        expect(rightResult.valid).toBeTruthy();

        const falseResultMaxRelativeAmount = await validate('89999999990', rule);
        expect(falseResultMaxRelativeAmount.valid).toBeFalsy();
        const rightResultMaxRelativeAmount = await validate('8999999999', rule);
        expect(rightResultMaxRelativeAmount.valid).toBeTruthy();
    });
    test("divisibility of the token '534CD11F6D984B4B' is 5", async () => {
        wrapper2.setProps({
            tokenHex: '534CD11F6D984B4B',
        });
        await flushPromises();
        const rule = wrapper2.vm.validationRules.amount;
        const falseResult = await validate('10.123456', rule);
        expect(falseResult.valid).toBeFalsy();
        const rightResult = await validate('10.12345', rule);
        expect(rightResult.valid).toBeTruthy();

        const falseResultMaxRelativeAmount = await validate('899999999900', rule);
        expect(falseResultMaxRelativeAmount.valid).toBeFalsy();
        const rightResultMaxRelativeAmount = await validate('89999999990', rule);
        expect(rightResultMaxRelativeAmount.valid).toBeTruthy();
    });
});
