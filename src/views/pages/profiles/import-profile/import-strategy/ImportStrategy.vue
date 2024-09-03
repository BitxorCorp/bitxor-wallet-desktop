<template>
    <div class="import-way-wrapper radius">
        <div class="import-way-inner-panel">
            <div class="welcome-head">
                <p class="title">
                    {{ $t('access_my_profile') }}
                </p>
                <p class="title-tips">
                    {{ $t('existing_profile') }}
                    <button style="background: linear-gradient(315.55deg, #26c3f2 -1.68%, #007dbb 110.7%);" class="pointer button ivu-btn ivu-btn-default" @click="$router.push({ name: 'profiles.login' })">
                        <span style="color: #fff;">{{ $t('go_to_login') }}</span>
                    </button>
                </p>
            </div>
            <div class="profile-type">
                <div
                    v-for="(item, index) in importInfoList"
                    :key="index"
                    :class="'profile-item' + (item.title === 'access_ledger' && !isLedgerAvailable ? ' profile-item-disabled' : '')"
                    @click="redirect(item.route)"
                >
                    <Tooltip
                        v-if="item.title === 'access_ledger' && !isLedgerAvailable"
                        placement="top"
                        :content="$t('ledger_available_on_standalone_app')"
                    >
                        <div>
                            <div class="img-box radius">
                                <img :src="item.image" />
                            </div>
                            <p class="access-name">
                                {{ $t(item.title) }}
                            </p>
                            <p class="access-info">
                                {{ $t(item.description) }}
                            </p>
                        </div>
                    </Tooltip>
                    <div v-else>
                        <div class="img-box radius">
                            <img :src="item.image" />
                        </div>
                        <p class="access-name">
                            {{ $t(item.title) }}
                        </p>
                        <p class="access-info">
                            {{ $t(item.description) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ImportStrategyTs from './ImportStrategyTs';
export default class ImportStrategy extends ImportStrategyTs {}
</script>
<style lang="less" scoped>
@import './ImportStrategy.less';
</style>
