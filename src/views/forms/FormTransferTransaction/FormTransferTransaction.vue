<template>
    <div class="FormTransferTransaction">
        <FormWrapper>
            <ValidationObserver v-slot="{ handleSubmit }" ref="observer" slim>
                <form onsubmit="event.preventDefault()">
                    <div v-if="showTransactionActions" class="transfer-actions">
                        <a @click="isImportTransactionUriModalVisible = true">
                            <!--<Icon type="md-arrow-round-down" />-->{{ $t('import_transaction_uri') }}
                        </a>
                    </div>

                    <!-- Transaction signer selector -->
                    <SignerSelector
                        v-if="!hideSigner && !isOfflineMode"
                        v-model="formItems.signerAddress"
                        :root-signer="currentAccountSigner"
                        :is-aggregate="isAggregate"
                        @input="signerChanged"
                    />
                    <AccountSignerSelector v-if="!hideSigner && isOfflineMode" />

                    <!-- Transfer recipient input field -->
                    <RecipientInput v-model="formItems.recipientRaw" style="margin-bottom: 0.5rem;" @input="onChangeRecipient" />

                    <!-- Tokens attachments input fields -->
                    <div v-for="(attachedToken, index) in formItems.attachedTokens" :key="index">
                        <TokenAttachmentInput
                            v-if="attachedToken && attachedToken.uid"
                            :token-attachment="attachedToken"
                            :token-hex-ids="tokenInputsManager.getTokensBySlot(attachedToken.uid)"
                            :absolute="false"
                            :uid="attachedToken.uid"
                            :is-show-delete="index > 0 && index === formItems.attachedTokens.length - 1"
                            :is-first-item="index === 0"
                            :is-offline="isOfflineMode"
                            :selected-fee-value="selectedFeeValue"
                            :is-aggregate="isAggregate"
                            @input-changed="onTokenInputChange"
                            @input-deleted="onDeleteTokenInput"
                        />
                    </div>

                    <!-- Add token button -->
                    <div v-if="tokenInputsManager.hasFreeSlots()" class="form-row align-right action-link" style="margin-top: -0.1rem;">
                        <a
                            v-if="tokenInputsManager.hasFreeSlots()"
                            style="color: #26c3f2; margin-right: 0.1rem; font-size: 0.14rem;"
                            @click="addTokenAttachmentInput"
                            >{{ $t('add_token') }}</a
                        >
                        <img
                            src="@/views/resources/img/newicons/Add.png"
                            class="icon-left-button clickable"
                            style="vertical-align: middle;"
                            @click="addTokenAttachmentInput"
                        />
                    </div>

                    <!-- Transfer message input field -->
                    <MessageInput v-model="formItems.messagePlain" @input="onChangeMessage" />
                    <FormRow v-if="!selectedSigner.multisig && !isAggregate && !isLedger && !hideEncryption">
                        <template v-slot:inputs>
                            <div class="inputs-container checkboxes">
                                <Checkbox v-model="formItems.encryptMessage" @input="onEncryptionChange">
                                    {{ $t('encrypt_message') }}
                                </Checkbox>
                            </div>
                        </template>
                    </FormRow>

                    <!-- Transaction fee selector and submit button -->
                    <MaxFeeAndSubmit
                        v-if="!isAggregate"
                        v-model="formItems.maxFee"
                        :hide-submit="hideSubmit"
                        :submit-button-text="submitButtonText"
                        :calculated-recommended-fee="calculatedRecommendedFee"
                        :disable-submit="currentAccount.isMultisig"
                        :size="transactionSize"
                        @selected-fee="onSelectFeeValue"
                        @button-clicked="handleSubmit(onSubmit)"
                        @input="onChangeMaxFee"
                    />
                    <div v-else-if="!hideSave" class="ml-2" style="text-align: right;">
                        <button
                            type="submit"
                            class="save-button centered-button button-style inverted-button"
                            :disabled="currentAccount.isMultisig"
                            @click="emitToAggregate"
                        >
                            {{ $t('save') }}
                        </button>
                    </div>

                    <!-- Transaction URI display-->
                    <FormRow v-if="transactions && transactions.length > 0" class="transaction-uri-display-row">
                        <template v-slot:inputs>
                            <TransactionUriDisplay :transaction="transactions[0]" />
                        </template>
                    </FormRow>
                </form>
            </ValidationObserver>

            <ModalTransactionConfirmation
                v-if="hasConfirmationModal"
                :command="command"
                :visible="hasConfirmationModal"
                @transaction-signed="onSignedOfflineTransaction"
                @success="onConfirmationSuccess"
                @error="onConfirmationError"
                @close="onConfirmationCancel"
            />

            <ModalTransactionUriImport
                v-if="isImportTransactionUriModalVisible"
                :visible="isImportTransactionUriModalVisible"
                @close="onImportTransactionURIModalClose"
                @importTransaction="onImportTransaction"
            />

            <ModalFormProfileUnlock
                v-if="hasAccountUnlockModal"
                :visible="hasAccountUnlockModal"
                :on-success="onAccountUnlocked"
                @close="closeAccountUnlockModal"
            />
        </FormWrapper>

        <!-- force token list reactivity -->
        <div v-show="false">{{ currentTokenList() }}</div>
    </div>
</template>

<script lang="ts">
import { FormTransferTransactionTs } from './FormTransferTransactionTs';
export default class FormTransferTransaction extends FormTransferTransactionTs {}
</script>

<style lang="less" scoped>
.save-button {
    text-align: center;
    width: 120px;
}
/deep/.multisig_ban_container {
    padding-left: 0.7rem;
}
</style>
