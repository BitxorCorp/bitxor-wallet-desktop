<template>
    <Select v-model="chosenValue" class="select-size select-style" :disabled="disabled" :placeholder="$t('select_a_token')">
        <Option v-for="tokenModel in filteredTokens" :key="getName(tokenModel)" :value="tokenModel.tokenIdHex">
            {{ getName(tokenModel) }}
        </Option>
    </Select>
</template>

<script lang="ts">
import { TokenNewSelectorTs } from './TokenNewSelectorTs';

export default class TokenNewSelector extends TokenNewSelectorTs {}
</script>
