import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import json from '../../public/locales/en/translation.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['translations'],
    defaultNS: 'translations',
    resources: { en: { translations: json } },
  });

export default i18n;
