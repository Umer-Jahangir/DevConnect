import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../i18n/en.json';
import ur from '../i18n/ur.json';
import hi from '../i18n/hi.json';
import es from '../i18n/es.json';
import ar from '../i18n/ar.json';

i18n.use(initReactI18next).init({
  resources: { en, ur, hi, es, ar },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
