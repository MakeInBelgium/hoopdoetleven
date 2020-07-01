import get from 'lodash/get';
import dutchMessages from '../lang/nl';
import frenchMessages from '../lang/fr';
import germanMessages from '../lang/de';

const language = document.querySelector('html').getAttribute('lang') || 'nl';

const messages = {
    nl: dutchMessages,
    fr: {...dutchMessages, ...frenchMessages},
    de: {...dutchMessages, ...germanMessages},
};

export const translate = (key) => get(messages[language], key, key);
export const required = (value) => (value ? undefined : "vereist");
