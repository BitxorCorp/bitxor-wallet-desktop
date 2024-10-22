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
// external dependencies
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
// child components
// @ts-ignore
import ProfileBalancesPanel from '@/components/ProfileBalancesPanel/ProfileBalancesPanel.vue';
// @ts-ignore
import NetworkStatisticsPanel from '@/components/NetworkStatisticsPanel/NetworkStatisticsPanel.vue';
// @ts-ignore
import NavigationTabs from '@/components/NavigationTabs/NavigationTabs.vue';

@Component({
    components: {
        ProfileBalancesPanel,
        NetworkStatisticsPanel,
        NavigationTabs,
    },
    computed: {
        ...mapGetters({
            currentAccount: 'account/currentAccount',
        }),
    },
})
export class DelegatedHarvestingPage extends Vue {}
