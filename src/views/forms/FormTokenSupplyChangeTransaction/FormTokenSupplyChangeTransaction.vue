<template>
    <FormWrapper>
        <ValidationObserver v-slot="{ handleSubmit }" ref="observer" slim>
            <form onsubmit="event.preventDefault()" class="form-container">
                <FormRow v-if="isAggregate">
                    <template v-slot:label> {{ $t('token') }}: </template>

                    <template v-slot:inputs>
                        <ValidationProvider
                            v-slot="{ errors }"
                            vid="newDuration"
                            :name="$t('token')"
                            rules="required"
                            :immediate="true"
                            slim
                        >
                            <ErrorTooltip :errors="errors">
                                <TokenSelector
                                    v-model="formItems.tokenHexId"
                                    :token-hex-ids="ownedTargetHexIds"
                                    default-token="firstInList"
                                    required
                                />
                            </ErrorTooltip>
                        </ValidationProvider>
                    </template>
                </FormRow>
                <FormRow>
                    <template v-slot:label> {{ $t('form_label_supply_direction') }}: </template>
                    <template v-slot:inputs>
                        <div class="select-container">
                            <ValidationProvider
                                v-slot="{ errors }"
                                vid="newDuration"
                                :name="$t('direction')"
                                rules="required"
                                :immediate="true"
                                slim
                            >
                                <ErrorTooltip :errors="errors">
                                    <Select v-model="formItems.action" class="select-size select-style">
                                        <Option :value="TokenSupplyChangeAction.Increase">
                                            {{ $t('increase') }}
                                        </Option>
                                        <Option :value="TokenSupplyChangeAction.Decrease">
                                            {{ $t('decrease') }}
                                        </Option>
                                    </Select>
                                </ErrorTooltip>
                            </ValidationProvider>
                        </div>
                    </template>
                </FormRow>

                <SupplyInput v-model="formItems.delta" label="form_label_supply_delta" />

                <FormRow>
                    <template v-slot:label> {{ $t('form_label_current_supply') }}: </template>
                    <template v-slot:inputs>
                        <div class="row-left-message">
                            <span v-if="currentTokenInfo" class="pl-2">
                                {{ $t('relative') }}: {{ currentTokenRelativeSupply }} ({{ $t('absolute') }}:
                                {{ currentTokenInfo.supply.toLocaleString() }})
                            </span>
                        </div>
                    </template>
                </FormRow>

                <FormRow>
                    <template v-slot:label> {{ $t('form_label_new_supply') }}: </template>
                    <template v-slot:inputs>
                        <ValidationProvider
                            v-slot="{ validate, errors }"
                            vid="newDuration"
                            :name="$t('form_label_new_absolute_supply')"
                            :rules="validationRules.supply"
                            :immediate="true"
                            slim
                        >
                            <input v-show="false" v-model="newTokenAbsoluteSupply" @change="validate" />
                            <ErrorTooltip :errors="errors">
                                <div class="input-size row-left-message">
                                    <span :class="['pl-2', errors.length ? 'red' : '']">
                                        {{ $t('relative') }}: {{ newTokenRelativeSupply || '' }} ({{ $t('absolute') }}:
                                        {{ newTokenAbsoluteSupply && newTokenAbsoluteSupply.toLocaleString() }})
                                    </span>
                                </div>
                            </ErrorTooltip>
                        </ValidationProvider>
                    </template>
                </FormRow>

                <MaxFeeAndSubmit v-if="!isAggregate" v-model="formItems.maxFee" @button-clicked="handleSubmit(onSubmit)" />
                <div v-else-if="!hideSave" class="ml-2" style="text-align: right;">
                    <button
                        type="submit"
                        class="save-button centered-button button-style inverted-button"
                        :disabled="currentAccount.isMultisig || !formItems.tokenHexId || formItems.action == null"
                        @click="emitToAggregate"
                    >
                        {{ $t('save') }}
                    </button>
                </div>
            </form>
        </ValidationObserver>
        <ModalTransactionConfirmation
            v-if="hasConfirmationModal"
            :command="command"
            :visible="hasConfirmationModal"
            @success="onConfirmationSuccess"
            @error="onConfirmationError"
            @close="onConfirmationCancel"
        />
    </FormWrapper>
</template>

<script lang="ts">
// @ts-ignore
import { FormTokenSupplyChangeTransactionTs } from './FormTokenSupplyChangeTransactionTs';
export default class FormTokenSupplyChangeTransaction extends FormTokenSupplyChangeTransactionTs {}
</script>
<style lang="less" scoped>
.button-style {
    height: 0.3rem !important;
    width: 1.2rem;
}
/deep/.form-row-inner-container {
    grid-template-columns: 3rem 6.5rem !important;
}
</style>
