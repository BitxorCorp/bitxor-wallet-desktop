// external dependencies
import VueI18n from 'vue-i18n';
import Vue from 'vue';

// internal translation messages

import en_US from '@/language/en-US.json';
import es_ES from '@/language/es-ES.json';

// external translation messages
import enValidationMessages from 'vee-validate/dist/locale/en.json';
import esValidationMessages from 'vee-validate/dist/locale/es.json';

const defaultLang = 'en-US';

const messages = {
    'en-US': { ...en_US, validation: enValidationMessages.messages },
    'es-ES': { ...es_ES, validation: esValidationMessages.messages },
};

const navLang = navigator.language;
const localLang = Object.keys(messages).includes(navLang) ? navLang : false;
const lang = window.localStorage.getItem('locale') || localLang || defaultLang;

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: lang,
    messages,
    silentTranslationWarn: true,
});

// @ts-ignore
Vue.use({ i18n: (key, value) => i18n.t(key, value) });
window.localStorage.setItem('locale', lang);

export default i18n;
