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
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export class ModalNetworkNotMatchingProfileTs extends Vue {
    @Prop({ default: false }) visible: boolean;
    /**
     * Internal visibility state
     * @type {boolean}
     */
    protected get show(): boolean {
        return this.visible;
    }

    /**
     * Emits close event
     */
    protected set show(val) {
        if (!val) {
            this.$emit('close');
        }
    }

    /**
     * Logout user and redirect to login page
     */
    private async logout() {
        await this.$store.dispatch('profile/LOG_OUT');
        this.$emit('close');
        this.$router.push({ name: 'profiles.login' });
    }
    /**
     * Logout user and redirect to create profile page
     */
    private async createNewProfile() {
        await this.$store.dispatch('profile/LOG_OUT');
        this.$emit('close');
        this.$router.push({ name: 'profiles.importProfile.importStrategy' });
    }
}
