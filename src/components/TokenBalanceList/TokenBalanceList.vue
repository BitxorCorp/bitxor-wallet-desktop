<template>
    <div class="tokens-list-container">
        <Tabs v-if="!isEditionMode" size="small">
            <TabPane :label="$t('assets')" name="name1">
                <div class="tokenList secondary_page_animate">
                    <div v-for="(entry, index) in filteredBalanceEntries" :key="index" class="token_data">
                        <img v-if="downloadimgb(entry.id.toHex())" :src="downloadimg(entry.id.toHex())" alt contain height="38" />
                        <img v-else :src="downloadimg(entry.id.toHex())" class="grayed-bxr-logo" contain height="38" />

                        <span class="token_name">{{ entry.name !== '' ? entry.name : entry.id.toHex() }}</span>
                        <span class="token_value">
                            <TokenAmountDisplay
                                :id="entry.id"
                                :absolute-amount="entry.amount"
                                :absolute-price="entry.price"
                                :size="'normal'"
                            />
                        </span>
                    </div>
                </div>
            </TabPane>
            <img
                slot="extra"
                class="asset_list pointer"
                src="@/views/resources/img/monitor/monitorAssetListPurple.png"
                @click="isEditionMode = true"
            />
        </Tabs>
        <div v-else class="searchToken secondary_page_animate ivu-tabs ivu-tabs-mini">
            <div
                style="
                    margin-bottom: 0 !important;
                    position: relative;
                    padding: 0.13rem 0.13rem 0.13rem 0.13rem;
                    background: linear-gradient(63deg, #969290, #d8d8d8);
                    border-bottom: 0.02rem solid #fff !important;
                    border-top: 0.02rem solid #fff !important;
                    height: 0.7rem;
                "
            >
                <div style="height: 0.45rem; padding: 0.08rem 0.1rem !important;">
                    <img
                        src="@/views/resources/img/monitor/monitorLeftArrow.png"
                        class="asset_setting_tit pointer"
                        alt
                        @click="isEditionMode = false"
                    />
                </div>
            </div>

            <div class="tokenList">
                <div class="toggle_all_checked">
                    <span @click="toggleTokenDisplay()">
                        <img
                            class="toggle-token-display-icon"
                            :src="areAllTokensShown() ? dashboardImages.selected : dashboardImages.unselected"
                        />
                        {{ areAllTokensShown() ? $t('uncheck_all') : $t('select_all') }}
                    </span>
                </div>
                <div class="token-data-list">
                    <div
                        v-for="(entry, index) in allBalanceEntries"
                        :key="index"
                        :class="['token_data', index === 0 ? 'padding_top_0' : '']"
                        class="token_data pointer"
                        @click="toggleTokenDisplay(entry.id)"
                    >
                        <img class="small_icon" :src="isTokenHidden(entry.id) ? dashboardImages.unselected : dashboardImages.selected" />
                        <img
                            v-if="downloadimgb(entry.id.toHex())"
                            :src="downloadimg(entry.id.toHex())"
                            class="tokenIcon"
                            contain
                            height="30"
                            style="background-image: url(logobxr) no-repeat;"
                        />
                        <img
                            v-else
                            :src="downloadimg(entry.id.toHex())"
                            class="tokenIcon grayed-bxr-logo"
                            contain
                            height="30"
                            style="background-image: url(logobxr) no-repeat;"
                        />

                        <span class="token_name">
                            {{ entry.name }}
                        </span>
                        <span class="token_value">
                            <TokenAmountDisplay :id="entry.id" :absolute-amount="entry.amount" :size="'normal'" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { TokenBalanceListTs } from './TokenBalanceListTs';
export default class TokenBalanceList extends TokenBalanceListTs {}
</script>
<style lang="less" scoped>
@import './TokenBalanceList.less';
</style>
