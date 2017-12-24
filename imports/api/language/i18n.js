import I18N from 'meteor/ostrio:i18n';

const en = require('./definitions/en.json');

export const i18nConfig = {
    settings: { //--> Config object
        defaultLocale: "en",
        /*
        de: {
            code: "de",
            isoCode: "de-DE",
            name: "Deutsch"
        },
        */
        en: {
            code: "en",
            isoCode: "en-US",
            name: "English"
        }
    },
    /* de: de, */
    en: en,
};

export const getInstance = function () {
    return new I18N({i18n: i18nConfig});
};


export const i18n = getInstance();