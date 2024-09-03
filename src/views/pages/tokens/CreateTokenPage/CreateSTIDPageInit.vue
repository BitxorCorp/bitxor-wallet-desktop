<template>
    <AssetFormPageWrap>
        <template v-slot:form-section>
            <FormTokenDefinitionTransaction />
        </template>
        <template v-slot:form-description>
            <div class="asset-description-sub-title">
                {{ $t('token') }}
            </div>
            <div class="asset-description-text">
                {{ $t('token_describe_text') }}
            </div>
            <div class="asset-description-sub-title">
                {{ $t('supply') }}
            </div>
            <div class="asset-description-text">
                {{ $t('flags_supply') }}
            </div>
            <div class="asset-description-sub-title">
                {{ $t('divisibility') }}
            </div>
            <div class="asset-description-text">
                {{ $t('flags_divisibility') }}
            </div>
            <div class="asset-description-sub-title">
                {{ $t('duration_permanent') }}
            </div>
            <div class="asset-description-text">
                {{ $t('flags_duration_permanent') }}
            </div>
            <div class="asset-description-sub-title">
                {{ $t('transferable') }}
            </div>
            <div class="asset-description-text">
                {{ $t('flags_transferable') }}
            </div>
            <div class="asset-description-sub-title">
                {{ $t('variable_supply') }}
            </div>
            <div class="asset-description-text">
                {{ $t('flags_variable_supply') }}
            </div>
            <div class="asset-description-sub-title">
                {{ $t('restrictable') }}
            </div>
            <div class="asset-description-text">
                {{ $t('flags_restrictable') }}
            </div>
        </template>
    </AssetFormPageWrap>
</template>

<script lang="ts">
// external dependencies
import { Component, Vue } from 'vue-property-decorator';
import NavigationLinks from '@/components/NavigationLinks/NavigationLinks.vue';

// child components
import AssetFormPageWrap from '@/views/pages/assets/AssetFormPageWrap/AssetFormPageWrap.vue';
import FormTokenDefinitionTransaction from '@/views/forms/FormTokenDefinitionTransactionSTID/FormTokenDefinitionTransaction.vue';

// @ts-ignore
@Component({
    components: { AssetFormPageWrap, FormTokenDefinitionTransaction, NavigationLinks },
})
export default class CreateTokenPage extends Vue {}
</script>

<style lang="less" scoped>
/deep/ .form-wrapper {
    max-width: 14rem;
}
/deep/ .horizontal {
    justify-content: center !important;
}
</style>
