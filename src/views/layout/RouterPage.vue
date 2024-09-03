<template>
    <div class="wrap">
        <div
            class="switch-language-container"
            style="
                float: none;
                margin: 0px;
                vertical-align: middle; /* margin: 1px; */
                padding-top: 0px;

                padding-top: 0.1rem;
                padding-bottom: 0.1rem;
                padding-left: 1.4rem;
                background-color: rgb(0, 0, 0);
            "
        >
            <div style="vertical-align: middle; display: flex; padding: 0.1rem 0px;">
                <img class="logo" :src="require('@/views/resources/logobitxor.png')" style="height: 46px;" alt="" />
            </div>
            <div
                style="
                    float: right; /* margin: auto; */
                    vertical-align: middle;
                    display: flex;
                    padding: 0.1rem 0; /* border: 3px solid green; */
                "
            >
                <button class="trigger-accountlink" @click="$router.push('/offlineTransaction')">
                    <Icon type="ios-ionitron-outline" class="navbar-icon white" />
                    <span class="color white">{{ $t('go_to_offline_transactions') }}</span>
                </button>
                <div class="trigger-accountlink">
                    <Icon type="ios-locate-outline" class="navbar-icon white" />
                    <LanguageSelector />
                </div>
            </div>
        </div>
        <div style="display: flex; width: 100%; height: 100%;">
            <div class="general_view" style="width: 100%; background: linear-gradient(90deg, #007dbb, #25c3f1);">
                <div class="top_window level">
                    <div class="level-left"></div>
                    <div class="level-right"></div>
                </div>
                <transition name="fade" mode="out-in">
                    <div class="main-outer-container">
                        <div class="page-wrapper">
                            <router-view />
                        </div>
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
             <div class="network-container">
            <PeerSelector />
        </div>
            </div>
        </div>
         
    </div>
   
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector.vue';
import PeerSelector from '@/components/PeerSelector/PeerSelector.vue';

@Component({
    computed: {},
    components: { LanguageSelector, PeerSelector },
})
export default class RouterPage extends Vue {public packageVersion = process.env.PACKAGE_VERSION || '0';}
</script>
<style lang="less" scoped>
@import './RouterPage.less';
</style>
