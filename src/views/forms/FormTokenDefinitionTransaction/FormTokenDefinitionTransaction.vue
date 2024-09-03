<template>
    <FormWrapper>
        <ValidationObserver v-slot="{ handleSubmit }" ref="observer" slim>
            <form onsubmit="event.preventDefault()">
                <SignerSelector v-model="formItems.signerAddress" :root-signer="currentAccountSigner" @input="signerChanged" />

                 <NamespaceNameInput
                        v-model="formItems.newNamespaceName"
                        :is-need-auto-focus="false"
                        :namespace-registration-type="formItems.registrationType"
                        @input="stripTagsNamespaceName"
                    />
                <!-- hide supply input in aggregate transactions -->
                <SupplyInput v-if="!isAggregate" v-model="formItems.supply" />

                <DivisibilityInput v-model="formItems.divisibility" />

                <SupplyAmount v-if="!isAggregate" :supply="formItems.supply" :divisibility="formItems.divisibility" />

                <DurationInput v-show="!formItems.permanent" v-model="formItems.duration" :show-relative-time="true" target-asset="token" />

                <FormRow>
                    <template v-slot:label>Features:</template>
                    <template v-slot:inputs>
                        <div class="inputs-container checkboxes">
                            <Checkbox v-model="formItems.permanent" :disabled="true">
                                {{ $t('duration_permanent') }}
                            </Checkbox>
                            <Checkbox v-model="formItems.transferable" :disabled="true">
                                {{ $t('transmittable') }}
                            </Checkbox>
                            <Checkbox v-if="!isAggregate" v-model="formItems.supplyMutable">
                                {{ $t('variable_supply') }}
                            </Checkbox>
                            <Checkbox v-model="formItems.restrictable">
                                {{ $t('restrictable') }}
                            </Checkbox>
                        </div>
                    </template>
                </FormRow>
                <RentalFee :rental-type="'nametoken'"></RentalFee>
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
                <!-- <div style="margin-left: 0.7rem; margin-top: 0.7rem; background-color: #fff; border-radius: 0.1rem; padding: 10px;">
                    <spam style="font-size: 13px; font-family: 'Xolonium'; padding-bottom: 0.2rem; font-weight: bold;"
                        >Haz logrado dar el primer paso, estas a punto de crear un ID único para tu token, un registro que validará los principios de tu token en Bitxor Blockchain.

Supply Units: definirás la emisión total de token´s que necesitara tu proyecto. (Cantidad)
Divisibility: establece la cantidad en decimales que tu token llevara y comercializara. (0-8 decimales) 
Costo de Creación: es la comisión que cobra el core por crear el ID del token. 
Fee: pago por la transacción. 

Algunos Estándares que integra el LSC (Logic Smart Contract) del protocolo Bitxor: 
Unlimitec duration: define la durabilidad de tu token, según sea tu proyecto y puedes definir los tiempos a corto o largo plazo. 
Transferable: establece la función de los tokens sí puede ser transferible a otros o solo esta creado para ti. 
Supply mutable: puedes proyectar según el desarrollo de tu proyecto y amplificar la necesidad de tu token.  
Retrictable: es una forma de poner pautas en tu proyecto o token,  no cualquiera puede tenerlo si tu no lo autorizas o si no esta registrado. </spam
                    >
                </div> -->
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
</template>

<script lang="ts">
// @ts-ignore
import { FormTokenDefinitionTransactionTs } from './FormTokenDefinitionTransactionTs';
export default class FormTokenDefinitionTransaction extends FormTokenDefinitionTransactionTs {}
</script>

<style lang="less" scoped>
.checkboxes {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 0.3rem;
    align-items: baseline;
    color: #26c3f2;
    width: max-content;
}

/deep/ .form-row {
    .form-row-inner-container {
        grid-template-columns: 3rem calc(100% - 3rem);
    }
}

.save-button {
    text-align: center;
    width: 120px;
}

/deep/.multisig_ban_container {
    padding-left: 0.7rem;
}
</style>
