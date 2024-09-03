<template>
    <div class="invoice-container secondary_page_animate">
        <div class="invoice-inner-container scroll">
            <FormTransferTransaction
                :hide-encryption="true"
                :hide-signer="true"
                :hide-submit="true"
                @onTransactionsChange="onInvoiceChange"
            />
            <div class="form-wrapper form-row">
                <div class="form-row-inner-container">
                    <div class="label-container">
                        <div class="form-label-container"></div>
                    </div>
                    <div class="inputs-container">
                        <div class="invoice-section-container">
                            <div class="image-container">
                                <QRCodeDisplay
                                    :qr-code="transactionQR"
                                    alt="transaction_qr_code"
                                    show-download="true"
                                    :download-name="'invoiceqr_' + recipient"
                                />
                            </div>
                            <div class="description-container">
                                <div id="address_text" class="address_text top-qr-text">
                                    <span class="top-qr-text-title">{{ $t('recipient') }}:</span>
                                    <span>{{ recipient }}</span>
                                </div>

                                <div class="top-qr-text overflow_ellipsis">
                                    <span class="top-qr-text-title">{{ $t('token') }}:</span>
                                    <div v-if="balanceEntries.length">
                                        <div v-for="({ tokenHex, name, amount }, index) in balanceEntries" :key="index">
                                            <span>{{ amount }}</span>
                                            <span class="ml-2">{{ name }}</span>
                                            <span :hidden="name">{{ tokenHex }}</span>
                                        </div>
                                    </div>
                                    <span v-else>{{ 'N/A' }}</span>
                                </div>

                                <div class="top-qr-text">
                                    <span class="top-qr-text-title">{{ $t('message') }}:</span>
                                    <span class="message">{{
                                        currentTransaction && currentTransaction.message ? currentTransaction.message.payload : ''
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { DashboardInvoicePageTs } from './DashboardInvoicePageTs';
export default class DashboardInvoicePage extends DashboardInvoicePageTs {}
</script>
<style lang="less" scoped>
@import './DashboardInvoicePage.less';
</style>
