<template>
    <FormRow>
        <template v-slot:label>
            <span v-show="isFirstItem">{{ $t('token') }}:</span>
        </template>
        <template v-slot:inputs>
            <div class="row-token-attachment-input inputs-container">
                <TokenSelector v-model="chosenValue.tokenHex" :token-hex-ids="tokenHexIds" @input="onChangeToken" />
                <AmountInput
                    :key="chosenValue.tokenHex"
                    v-model="relativeAmount"
                    :token-hex="chosenValue.tokenHex"
                    class="ml-2"
                    :is-offline="isOffline"
                    :selected-fee-value="selectedFeeValue"
                    :is-aggregate="isAggregate"
                    @input="onChangeAmount"
                />
                <div v-show="isShowDelete" class="delete-token-container">
                    <span class="delete-token-icon" @click="$emit('input-deleted', uid)" />
                </div>
            </div>
        </template>
    </FormRow>
</template>

<script lang="ts">
import { TokenAttachmentInputTs } from './TokenAttachmentInputTs';
export default class TokenAttachmentInput extends TokenAttachmentInputTs {}
</script>
