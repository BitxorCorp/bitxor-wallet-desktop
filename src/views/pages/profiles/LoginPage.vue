<template>
    <div class="login-profile-wrapper" style="">
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
            <div style="display: flex; padding: 0.1rem 0; /* border: 3px solid green; */">
                <button class="trigger-accountlink" @click="$router.push('offlineTransaction')">
                    <Icon type="ios-ionitron-outline" class="navbar-icon white" />
                    <span class="color white">{{ $t('go_to_offline_transactions') }}</span>
                </button>
                <div class="trigger-accountlink">
                    <Icon type="ios-locate-outline" class="navbar-icon white" />
                    <LanguageSelector />
                </div>
            </div>
        </div>

        <div v-if="versionCheckerObject && !latestVersionInUse" class="update-box" role="alert">
            <strong>{{ $t('new_version_available') }}</strong>
            <a :href="downloadUrl" target="_blank" class="download-text-color">{{ $t('download_now') }}</a>
        </div>

        <ValidationObserver v-slot="{ handleSubmit }" slim>
            <form onsubmit="event.preventDefault()">
                <div class="welcome-box">
                    <div class="banner-image" style="height: 5.8rem; width: 150%;">
                        <span class="top-welcome-text">{{ $t('welcome_to_bitxor') }}</span>
                        <div class="bottom-welcome-text">{{ $t('program_description_line1') }}</div>
                    </div>
                    <div data-v-36faccd8="" class="" style="height: 5.8rem; text-align: right; padding-right: 0.9rem;">
                        <img src="@/views/resources/bitxornauta.png" class="logo-img" style="width: 3rem;" />
                    </div>

                    <div class="login-card radius" style="height: 5.8rem; background: linear-gradient(298deg, #b8b8b8, #ffffff);">
                        <img
                            class="img-logo logo"
                            :src="require('@/views/resources/bitxor_logo.png')"
                            style="height: 1rem; display: block; margin-left: auto; margin-right: auto; margin-bottom: 0.3rem;"
                            alt=""
                        />
                        <p class="login-title">
                            {{ $t('login_to_bitxor_account') }}
                        </p>
                        <p class="profile-name">
                            {{ $t('profile_name') }}
                        </p>
                        <ValidationProvider v-slot="{ errors }" :name="$t('profile_name')" :rules="`profileExists:${profileNames}`" slim>
                            <ErrorTooltip field-name="profile_name" :errors="errors">
                                <input v-show="false" v-model="formItems.currentProfileName" />

                                <AutoComplete
                                    v-model="formItems.currentProfileName"
                                    placeholder=" "
                                    :class="['select-account', !profilesClassifiedByNetworkType ? 'un_click' : 'profile-name-input']"
                                    :disabled="performingLogin"
                                >
                                    <div class="auto-complete-sub-container scroll">
                                        <div class="tips-in-sub-container">
                                            {{ $t(profilesClassifiedByNetworkType ? 'select_a_profile' : 'no_profiles_in_database') }}
                                        </div>
                                        <div v-if="profilesClassifiedByNetworkType">
                                            <div v-for="pair in profilesClassifiedByNetworkType" :key="pair.networkType">
                                                <div v-if="pair.profiles.length">
                                                    <span class="network-type-head-title">{{ getNetworkTypeLabel(pair.networkType) }}</span>
                                                </div>
                                                <Option
                                                    v-for="(profile, index) in pair.profiles"
                                                    :key="`${profile.profileName}${index}`"
                                                    :value="profile.profileName"
                                                    :label="profile.profileName"
                                                >
                                                    <span>{{ profile.profileName }}</span>
                                                </Option>
                                            </div>
                                        </div>
                                    </div>
                                </AutoComplete>
                            </ErrorTooltip>
                        </ValidationProvider>
                        <p class="input-password">
                            {{ $t('password') }}
                        </p>
                        <ValidationProvider v-slot="{ errors }" mode="passive" vid="password" :name="$t('password')" rules="required|min:8">
                            <ErrorTooltip field-name="password" :errors="errors">
                                <input
                                    v-model="formItems.password"
                                    v-focus
                                    :class="[!profilesClassifiedByNetworkType ? 'un_click' : '']"
                                    :placeholder="$t('please_enter_your_account_password')"
                                    type="password"
                                    :disabled="!profilesClassifiedByNetworkType || performingLogin"
                                />
                            </ErrorTooltip>
                        </ValidationProvider>

                        <div class="password-tip">
                            <span
                                v-if="!!getPasswordHint().length"
                                class="prompt pointer"
                                @click="formItems.hasHint = !formItems.hasHint"
                                >{{ $t('password_hint') }}</span
                            >
                            <spam
                                class="pointer create-profile"
                                :class="{ disabled: performingLogin }"
                                @click="
                                    if (!performingLogin) {
                                        $router.push({
                                            name: 'profiles.importProfile.importStrategy',
                                        });
                                    }
                                "
                            >
                                {{ $t('create_a_new_account') }}
                            </spam>
                        </div>
                        <div v-if="formItems.hasHint && !!getPasswordHint().length" class="hint">
                            {{ $t('password_hint') }}: {{ getPasswordHint() }}
                        </div>
                        <Button
                            v-if="profilesClassifiedByNetworkType"
                            class="pointer button"
                            :loading="performingLogin"
                            html-type="submit"
                            style="margin-top: 0.25rem; margin-bottom: 0.4rem;"
                            @click.stop="handleSubmit(submit)"
                        >
                            {{ $t('login') }}
                        </Button>
                        <div v-else class="pointer button" @click="$router.push({ name: 'profiles.importProfile.importStrategy' })">
                            {{ $t('register') }}
                        </div>
                    </div>
                </div>
            </form>
        </ValidationObserver>
         <div class="version-panel">
            <span class="spama">
                <a href="#/terms">{{ $t('terms_and_conditions') }}</a>
            </span>
            <span>
                <a href="#/privacy">{{ $t('privacy_policy') }}</a>
            </span>
            <span>
                {{ $t('version') }}: <b>{{ packageVersion }}</b>
            </span>
        </div>
        <span class="copyright_label">{{ $t('copyright') }}</span>
    </div>
</template>

<script lang="ts">
import LoginPageTs from './LoginPageTs';
export default class LoginPage extends LoginPageTs {}
</script>
<style lang="less" scoped>
@import './LoginPage.less';
</style>
