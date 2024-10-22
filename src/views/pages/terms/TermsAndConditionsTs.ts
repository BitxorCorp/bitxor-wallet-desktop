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
import { Component, Vue } from 'vue-property-decorator';
// @ts-ignore
import pdf from 'vue-pdf';
import terms from '../../../documents/terms.json';

const data = 'data:application/pdf;base64,' + terms.base64;
const loadingTask = pdf.createLoadingTask(data);

@Component({
    components: {
        pdf,
    },
    mounted() {
        this.src = pdf.createLoadingTask(data);
        this.src.promise.then((pdf) => {
            this.numPages = pdf.numPages;
        });
    },
    data() {
        return {
            data,
            src: loadingTask,
            numPages: undefined,
        };
    },
})
export default class TermsAndConditionsTs extends Vue {
    /**
     * back
     */
    private backToLogin() {
        window && window.history.back();
    }
}
