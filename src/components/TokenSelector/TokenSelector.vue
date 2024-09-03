<template>
    <ValidationProvider v-slot="{ errors }" vid="selectedToken" :name="$t(label)" :rules="'required'" tag="div" class="select-container">
        <ErrorTooltip :errors="errors">
            <Select v-model="selectedToken" v-focus :disabled="disabled" class="select-size select-style">
                <Option v-for="m in displayedTokens" :key="m.tokenIdHex" :value="m.tokenIdHex">
                    {{ m.name || m.tokenIdHex }}
                </Option>
            </Select>
        </ErrorTooltip>
    </ValidationProvider>
</template>

<script lang="ts">
import { TokenSelectorTs } from './TokenSelectorTs';

export default class TokenSelector extends TokenSelectorTs {}
</script>
