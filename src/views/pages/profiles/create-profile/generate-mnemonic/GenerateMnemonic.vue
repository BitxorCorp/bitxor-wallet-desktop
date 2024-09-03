<template>
    <div class="step-2-wrapper">
        <img src="@/views/resources/img/login/connector-pink.png" />
        <spam style="font-size: 0.15rem; padding: 0.1rem 0; color: #007dbb;">{{ $t('move_mouse') }}</spam>
        <Progress stroke-color="#26c3f2" :percent="percent" />
    </div>
</template>

<script lang="ts">
import GenerateMnemonicTs from './GenerateMnemonicTs';
export default class GenerateMnemonic extends GenerateMnemonicTs {}
</script>
<style lang="less" scoped>
@import './GenerateMnemonic.less';
</style>
