<template>
    <div>
        <FormWrapper class="namespace-transaction-form-wrapper">
            <ValidationObserver v-slot="{ handleSubmit }" ref="observer" slim>
                <form onsubmit="event.preventDefault()" class="form-container mt-3 create-namespace-form">
                    <SignerSelector v-model="formItems.signerAddress" :root-signer="currentAccountSigner" @input="signerChanged" />

                    <NamespaceSelector label="form_label_token" :value="formItems.tokenId" :onlybps="true" @input="setTokenId" />

                    <NamespaceNameInput
                        v-model="formItems.newNamespaceName"
                        :is-need-auto-focus="false"
                        :namespace-registration-type="formItems.registrationType"
                        @input="stripTagsNamespaceName"
                    />
                    <FormRow v-if="formItems.registrationType === typeSubNamespace">
                        <template v-slot:label> {{ $t('current_validity') }}: </template>
                        <template v-slot:inputs>
                            <div class="inputs-container">
                                <div class="display-value">
                                    {{ relativeTimeToParent }}
                                </div>
                            </div>
                        </template>
                    </FormRow>

                    <RentalFee
                        :rental-type="formItems.registrationType === typeRootNamespace ? 'root-namespace' : 'child-namespace'"
                        :duration="formItems.duration"
                    />
                    <MaxFeeAndSubmit
                        v-if="!isAggregate"
                        v-model="formItems.maxFee"
                        :disable-submit="currentAccount.isMultisig"
                        @button-clicked="handleSubmit(onSubmit)"
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
                    <div style="margin-left: 0.7rem; margin-top: 0.7rem; background-color: #fff; border-radius: 0.1rem; padding: 10px;">
                        <spam style="font-size: 13px; font-family: 'Xolonium'; padding-bottom: 0.2rem; font-weight: bold;"
                            >Ok, ya estas avanzando bienvenido al segundo paso, aquí definirás el NameSpace para tu token, un nombre de
                            permanencia como un dominio que validará la propiedad de tu token sobre el ID Unico dentro de Bitxor Blockchain.
                            NameSpace: define el nombre que representara tu Token, por el que se dará a conocer tu proyecto. Duration: el
                            core esta establecido en brindar una durabilidad por 10 años, después de ese tiempo podrás renovar o actualizar
                            el nombre de tu token. Costo de Creación: es la comisión que cobra el core por crear el NameSpace del token.
                            Fee: pago por la transacción.
                        </spam>
                    </div>
                </form>
            </ValidationObserver>

            <ModalTransactionConfirmation
                v-if="hasConfirmationModal"
                :command="command"
                :visible="hasConfirmationModal"
                @success="onConfirmationSuccess"
                @error="onConfirmationError"
                @close="onConfirmationCancel"
            />
        </FormWrapper>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import { FormNamespaceRegistrationTransactionTs } from './FormNamespaceRegistrationTransactionTs';
export default class FormNamespaceRegistrationTransaction extends FormNamespaceRegistrationTransactionTs {}
</script>
<style lang="less" scoped>
@import './FormNamespaceRegistrationTransaction.less';

/deep/ .form-row {
    .form-row-inner-container {
        grid-template-columns: 3rem calc(100% - 3rem);
    }
}

.save-button {
    text-align: center;
    width: 120px;
}
</style>
