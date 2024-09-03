<template>
    <span style="display: flex; align-items: flex-end; flex-direction: column;" :class="['amount', 'overflow_ellipsis', color]">
        <AmountDisplay :value="amount" :decimals="divisibility || 0" :size="size" :show-ticker="showTicker" :ticker="ticker" />
        <p
            :style="
                size == 'normal'
                    ? 'margin-top: -5px; font-size: 0.11rem; color: rgb(161 158 156);'
                    : 'font-size:  0.18rem;  color: rgba(255, 255, 255, 0.46);'
            "
        >
            $<AmountDisplay size="smaller2" :value="price" :decimals="divisibility || 0" :show-ticker="showTicker" :ticker="ticker" />
        </p>
    </span>
</template>

<script lang="ts">
import { TokenAmountDisplayNewTs } from './TokenAmountDisplayNewTs';
export default class TokenAmountDisplayNew extends TokenAmountDisplayNewTs {}
</script>
<style lang="less" scoped>
@import './TokenAmountDisplay.less';
</style>
