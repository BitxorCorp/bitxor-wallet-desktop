<template>
    <div class="balances-panel-outer-container">
        <div class="balances-panel-container">
            <div
                :class="{
                    top_account_address: true,
                    radius: true,
                    grayed: isCosignatoryMode,
                    purpled: !isCosignatoryMode,
                    'bxr-outline': true,
                }"
                style="display: flex; flex-direction: column; justify-content: space-between;"
            >
                <div v-if="networkCurrency" class="BXR_amount overflow_ellipsis" style="display: flex; justify-content: space-between;">
                    <!--   <div>{{ networkCurrency.ticker }}</div> -->
                    <div>
                        <p style="line-height: 1; font-size: 0.35rem;">
                            BXR
                        </p>
                    </div>
                    <div class="amount">
                        <TokenAmountDisplay :absolute-amount="absoluteBalance" :absolute-price="absolutePrice" :size="'biggest'" />
                    </div>
                </div>
                <div v-if="currentSignerAddress" class="account_address">
                    <div>
                        <div class="address">{{ currentSignerAddress.plain() }}</div>
                    </div>
                    <div class="copy-button">
                        <ButtonCopyToClipboard :value="currentSignerAddress.plain()" type="icon-white" />
                    </div>
                </div>
            </div>
            <TokenBalanceList />
        </div>
    </div>
</template>

<script lang="ts">
import { ProfileBalancesPanelTs } from './ProfileBalancesPanelTs';
export default class ProfileBalancesPanel extends ProfileBalancesPanelTs {}
</script>
<style lang="less" scoped>
@import './ProfileBalancesPanel.less';
</style>
