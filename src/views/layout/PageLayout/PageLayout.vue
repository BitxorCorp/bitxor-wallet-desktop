<template>
    <div class="wrap">
        <div v-if="alert.show">
            <Alert class="alert warning_alert" type="error">
                <Icon type="ios-warning-outline" />
                {{ $t(`${alert.message}`) }}
                <a v-if="alert.showRetry" @click="reconnect">{{ ` ${'(' + $t('click_to_retry') + ')'}` }}</a>
            </Alert>
        </div>
        <div v-else-if="info.show">
            <Alert class="alert success_alert" type="success">
                <Icon type="ios-bulb-outline" />
                {{ $t(`${info.message}`) }}
            </Alert>
        </div>
        <div
            class="switch-language-container"
            style="
                display: flex;
                border-radius: 15px;
                margin: 0.35rem 0;
                margin-left: 27px;
                margin-right: 0.5rem;
                vertical-align: middle;
                display: flow-root;
                background: linear-gradient(272deg, #d8d8d8, #f1ebef);
            "
        >
            <div style="margin: auto; float: left; vertical-align: middle; display: flex; padding: 0.2rem 0.44rem;">
                <img src="@/views/resources/bitxor_logo.png" class="logo-container logo-img" style="height: 0.6rem;" />
            </div>
            <div class="top_window level" style="margin: auto; float: right; vertical-align: middle; display: flex; padding: 0.38rem 0px;">
                <ImportQRButton v-if="!!currentAccount" class="level-item navbar-item" valid-qr-types="[1, 3, 4, 8, 9]" />
                <AccountLinks
                    v-if="isTestnet"
                    :account="currentAccount"
                    :link="faucetUrl"
                    :icon="faucetIcon"
                    :title="$t('accounts_links_faucet')"
                    class="level-item navbar-item"
                />
                <AccountLinks
                    :account="currentAccount"
                    :link="explorerUrl"
                    :icon="explorerIcon"
                    :title="$t('accounts_links_explorer')"
                    class="level-item navbar-item"
                />
                <AccountSelectorField class="level-item navbar-item" :enable-min-width="true" @input="onChangeAccount" />
                <Settings class="level-item navbar-item" />
                <LogoutButton />
            </div>
        </div>
        <div style="display: flex; width: 100%; height: 100%;">
            <PageNavigator v-if="!$route.matched.map(({ name }) => name).includes('profiles')" />
            <div class="general_view" style="width: 100%;">
                <transition name="fade" mode="out-in">
                    <div class="main-outer-container">
                        <router-view />
                    </div>
                </transition>
                <div class="footer">
                    <span class="footer-phrase">{{ $t('copyright') }}</span>
                </div>
                <div class="version-panel">
                    <span>
                        <a href="#/terms">{{ $t('terms_and_conditions') }}</a>
                    </span>
                    <span>
                        <a href="#/privacy">{{ $t('privacy_policy') }}</a>
                    </span>
                    <span>
                        {{ $t('version') }}: <b>{{ packageVersion }}</b>
                    </span>
                </div>
            </div>
        </div>

        <ModalDebugConsole
            v-if="hasDebugConsoleModal"
            :visible="hasDebugConsoleModal"
            :title="$t('modal_title_debug_console')"
            @close="hasDebugConsoleModal = false"
        />
    </div>
</template>

<script lang="ts">
import { PageLayoutTs } from './PageLayoutTs';
export default class PageLayout extends PageLayoutTs {
    public packageVersion = process.env.PACKAGE_VERSION || '0';
}
</script>
<style lang="less" scoped>
@import './PageLayout.less';
</style>
