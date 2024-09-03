<template>
    <div class="transaction-row-container transaction-row-columns" @click="$emit('click', transaction)">
        <!-- FIRST COLUMN -->
        <div class="icon-cell">
            <img :src="getIcon()" class="icon-cell-image" />
        </div>

        <!-- SECOND COLUMN -->
        <div class="address-cell">
            <ActionDisplay :transaction="transaction" :is-optin-payout-transaction="isOptinPayoutTransaction" />
        </div>

        <!-- THIRD COLUMN -->
        <div class="amount-cell">
            <div v-if="hasNonNativeToken() || hasNetworkToken()">
                <TokenAmountDisplay
                    v-if="hasNetworkToken()"
                    :id="getAmountTokenId()"
                    :absolute-amount="getAmount()"
                    :color="getAmountColor()"
                    :show-ticker="isAmountShowTicker()"
                />

                <!-- Token icon for non native tokens. -->
                <div v-if="hasNonNativeToken()" class="extend-icon-holder">
                    <Tooltip placement="right">
                        <img :src="getTokensIcon()" />
                        <div slot="content">
                            <!-- allow top 5 tokens show in the tooltip -->
                            <div v-for="token in nonNativeTokenList().slice(0, numberOfShowMosicsTooltips)" :key="token.id">
                                {{ token.name }} - {{ token.relativeAmount }}
                            </div>

                            <div v-if="nonNativeTokenList().length - numberOfShowMosicsTooltips > 0">
                                {{ $t('tooltip_token_view_more', { count: nonNativeTokenList().length - numberOfShowMosicsTooltips }) }}
                            </div>
                        </div>
                    </Tooltip>
                </div>

                <!-- Message icon on transaction list -->
                <div v-if="hasMessage()" class="extend-icon-holder">
                    <Tooltip placement="right">
                        <img :src="getEnvelopeIcon()" />
                        <div slot="content">
                            {{ messagePayload }}
                        </div>
                    </Tooltip>
                </div>
            </div>

            <span v-else>N/A</span>
        </div>

        <!-- FOURTH COLUMN -->
        <div class="confirmation-cell">
            {{ getHeight() }}
            <Tooltip v-if="hasMissSignatures && !transactionSigningFlag" :content="$t('transaction_signed')" placement="top">
                <Icon type="md-done-all" size="17" class="coloring" />
            </Tooltip>
        </div>

        <!-- FIFTH COLUMN -->
        <div class="hash-cell">
            <!--
            <span class="hash-cell-transaction-hash">
                <a class="url_text" target="_blank" :href="explorerUrl">
                    {{ formatters.miniHash(transaction.transactionInfo.hash) }}
                </a>
            </span>
            -->
            <span class="hash-cell-time">
                <!-- @TODO: Should be transaction time instead of deadline -->
                {{ date }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import { TransactionRowTs } from './TransactionRowTs';

export default class TransactionRow extends TransactionRowTs {}
</script>
