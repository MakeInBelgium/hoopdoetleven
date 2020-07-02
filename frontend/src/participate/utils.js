import get from 'lodash/get';
import dutchMessages from '../lang/nl';
import frenchMessages from '../lang/fr';
import germanMessages from '../lang/de';

export const currentLang = () => document.querySelector('html').getAttribute('lang') || 'nl';

const language = currentLang();

const messages = {
    nl: dutchMessages,
    fr: {...dutchMessages, ...frenchMessages},
    de: {...dutchMessages, ...germanMessages},
};

export const translate = (key) => get(messages[language], key, key);
export const required = (value) => (value ? undefined : translate('validation.required'));

export const minMax = (min, max, minMsg, maxMsg) => (value = '') => {
    const length = value.length || 0;

    if(length < min) {
        return translate(minMsg);
    }

    if(length > max) {
        return translate(maxMsg);
    }

    return undefined;
};
