<template>
    <div class="container">
        <Modal v-model="show" :title="$t(title)" :transfer="false" class-name="modal-container" :footer-hide="true">
            <FormWrapper class="key-input-container" :whitelisted="true">
                <ValidationObserver v-slot="{ handleSubmit }" ref="observer" class="key-input-container" slim>
                    <form class="form-line-container mt-3" onsubmit="event.preventDefault()">
                        <FormRow>
                            <template v-slot:label> {{ $t('key_type') }}: </template>
                            <template v-slot:inputs>
                                <div class="inputs-container">
                                    <div class="select-container">
                                        <Select v-model="type" class="select-size select-style">
                                            <Option value="create_remote_public_key">
                                                {{ $t('generate_random_public_key') }}
                                            </Option>
                                            <Option value="voting">
                                                {{ $t('import_key_manually') }}
                                            </Option>
                                        </Select>
                                    </div>
                                </div>
                            </template>
                        </FormRow>
                        <div v-if="showVotingForm">
                            <FormRow>
                                <template v-slot:label> {{ $t('public_key') }}: </template>
                                <template v-slot:inputs>
                                    <div class="inputs-container">
                                        <ValidationProvider v-slot="{ errors }" mode="lazy" vid="publicKey" :name="$t('public_key')" slim>
                                            <ErrorTooltip :errors="errors">
                                                <input
                                                    v-model="publicKey"
                                                    v-focus
                                                    type="text"
                                                    name="publicKey"
                                                    class="input-size input-style"
                                                />
                                            </ErrorTooltip>
                                        </ValidationProvider>
                                    </div>
                                </template>
                            </FormRow>
                            <FormRow>
                                <template v-slot:label> {{ $t('inipoh_voting') }}: </template>
                                <template v-slot:inputs>
                                    <div class="ivu-tooltip">
                                        <div class="inputs-container">
                                            <input v-model="inipoh" v-focus type="text" name="inipoh" class="input-size input-style" />
                                        </div>
                                    </div>
                                </template>
                            </FormRow>
                            <FormRow>
                                <template v-slot:label> {{ $t('endpoh_voting') }}: </template>
                                <template v-slot:inputs>
                                    <div class="ivu-tooltip">
                                        <div class="inputs-container">
                                            <input v-model="endpoh" v-focus type="text" name="endpoh" class="input-size input-style" />
                                        </div>
                                    </div>
                                </template>
                            </FormRow>
                        </div>
                        <div class="edit-button">
                            <button
                                class="button-style inverted-button pl-2 pr-2 submit-key"
                                type="submit"
                                :disabled="!isValidPublicKey"
                                @click="handleSubmit(onSubmit())"
                            >
                                {{ $t('confirm') }}
                            </button>
                        </div>
                    </form>
                </ValidationObserver>
            </FormWrapper>
        </Modal>
    </div>
</template>

<script lang="ts">
import ModalImportPublicKeyTs from './ModalImportPublicKeyTs';
export default class ModalImportPublicKey extends ModalImportPublicKeyTs {}
</script>

<style lang="less" scoped>
.key-input-container {
    display: block;
    width: 100%;
    clear: both;
    min-height: 1rem;
}
.submit-key {
    float: right;
}
</style>
