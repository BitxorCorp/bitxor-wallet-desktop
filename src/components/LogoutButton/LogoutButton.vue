<template>
    <div class="logout-container">
        <a class="logout-link" @click="logout">
         <img src="@/views/resources/img/newicons/NavLogout.png" class="navbar-icon" />
            <span>{{ $t('logout') }}</span>
        </a>
    </div>
</template>
<script lang="ts">
import { LogoutButtonTs } from './LogoutButtonTs';
export default class LogoutButton extends LogoutButtonTs {}
</script>
<style lang="less" scoped>
@import './LogoutButton.less';
</style>
