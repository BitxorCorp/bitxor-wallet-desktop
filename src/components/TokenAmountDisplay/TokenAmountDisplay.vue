<template>
    <span :class="['amount', 'overflow_ellipsis', color]">
        <AmountDisplay :value="amount" :decimals="divisibility || 0" :size="size" :show-ticker="showTicker" :ticker="ticker" />
    </span>
</template>

<script lang="ts">
import { TokenAmountDisplayTs } from './TokenAmountDisplayTs';
export default class TokenAmountDisplay extends TokenAmountDisplayTs {}
</script>
<style lang="less" scoped>
@import './TokenAmountDisplay.less';
</style>
