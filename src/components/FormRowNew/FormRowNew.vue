<template>
    <div style="padding: 0 0.5rem !important; width: 100%  !important;" :class="['form-row', className]">
        <div
            
        >
            <div v-if="!noLabel" class="label-container">
                <FormLabel style="padding-left: 0.1rem !important; padding-bottom: 0.1rem !important;">
                    <slot name="label" />
                </FormLabel>
            </div>
            <div class="inputs-container">
                <slot name="inputs" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// child components
import FormLabel from '@/components/FormLabelNew/FormLabelNew.vue';

@Component({ components: { FormLabel } })
export default class FormRowNew extends Vue {
    @Prop({ default: '' }) className: 'emphasis';
    @Prop({ default: false }) noLabel: boolean;
    @Prop({ default: false }) vertical: boolean;
}
</script>
<style lang="less" scoped>
@import './FormRow.less';
</style>
