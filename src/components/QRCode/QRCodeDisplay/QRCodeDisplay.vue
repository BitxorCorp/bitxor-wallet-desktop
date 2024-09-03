<template>
    <div class="qrcode-display">
        <span v-if="header !== ''" class="qrcode-display-header">{{ $t(header) }}</span>
        <img :src="qrCodeBase64$" :alt="$t(alt)" @click="copyAsText" />
        <span v-if="showDownload && isValidQR" class="qrcode-display-footer">
            <slot name="download">
                <a :href="qrCodeBase64$" :download="downloadName" style="display: flex;"
                    ><img src="@/views/resources/img/newicons/NavQRCode.png" style="
    display: inline;
    margin-right: 0.1rem;
    width: 0.25rem;
    height: 0.25rem;
"></img> {{ $t('button_download_qr') }}</a
                >
            </slot>
        </span>
    </div>
</template>

<script lang="ts">
import QRCodeDisplayTs from './QRCodeDisplayTs';
export default class QRCodeDisplay extends QRCodeDisplayTs {}
</script>
<style lang="less" scoped>
@import './QRCodeDisplay.less';
</style>
