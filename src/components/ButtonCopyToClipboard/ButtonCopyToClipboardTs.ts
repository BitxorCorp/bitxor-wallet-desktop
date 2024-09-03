import { Component, Vue, Prop } from 'vue-property-decorator';
import { UIHelpers } from '@/core/utils/UIHelpers';
import { NotificationType } from '@/core/utils/NotificationType';

@Component
export class ButtonCopyToClipboardTs extends Vue {
    @Prop({ default: null }) value: string;

    @Prop({ default: 'button' }) type: 'button' | 'icon-black' | 'icon-white' | 'icon-gray';

    @Prop({ default: 'mnemonic_copy' }) readonly tooltipText!: string;

    copyToClipboard() {
        const value: any = this.value;
        if (value) {
            try {
                UIHelpers.copyToClipboard(value);
                this.$store.dispatch('notification/ADD_SUCCESS', NotificationType.COPY_SUCCESS);
            } catch (e) {
                this.$store.dispatch('notification/ADD_ERROR', NotificationType.COPY_FAILED);
            }
        }
    }
}
