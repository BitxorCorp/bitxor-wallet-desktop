/*
 * (C) Bitxor Community 2022
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 *
 */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
// @ts-ignore
import ErrorTooltip from '@/components/ErrorTooltip/ErrorTooltip.vue';
// @ts-ignore
import FormRow from '@/components/FormRow/FormRow.vue';
import { ValidationRuleset } from '@/core/validation/ValidationRuleset';
// @ts-ignore
import FormWrapper from '@/components/FormWrapper/FormWrapper.vue';
// @ts-ignore
import { PublicKeyValidator } from '@/core/validation/validators';

import { mapGetters } from 'vuex';
import { ProfileModel } from '@/core/database/entities/ProfileModel';
@Component({
    components: {
        ErrorTooltip,
        ValidationObserver,
        ValidationProvider,
        FormRow,
        FormWrapper,
    },
    computed: {
        ...mapGetters({
            currentProfile: 'profile/currentProfile',
        }),
    },
})
export default class ModalImportPublicKeyTs extends Vue {
    @Prop({
        default: false,
    })
    visible: boolean;

    @Prop({
        default: '',
    })
    title: string;
    /**
     * Validation rules
     * @var {ValidationRuleset}
     */
    public validationRules = ValidationRuleset;
    private publicKey: string = '';
    private inipoh: string = '';
    private endpoh: string = '';
    private type: string = '';
    private currentProfile: ProfileModel;
    /**
     * Visibility state
     * @type {boolean}
     */
    get show(): boolean {
        return this.visible;
    }

    /**
     * Emits close event
     */
    set show(val) {
        if (!val) {
            this.$emit('close');
        }
    }

    public get isValidPublicKey(): boolean {
        if (PublicKeyValidator.validate(this.publicKey, this.currentProfile.networkType) || this.type === 'random_key') {
            return true;
        }
        return false;
    }

    /**
     * Hook called when child component FormSubAccountCreation emits
     * the 'submit' event.
     */
    public onSubmit() {
        if (!!this.publicKey.length) {
            this.$emit('submit', { public: this.publicKey, inipoh: this.inipoh, endpoh: this.endpoh, type: 'voting' });
        }

        this.$emit('confirmed', true);
    }
    get showVotingForm() {
        return this.type === 'voting';
    }
}
