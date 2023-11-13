import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { translationEn, translationVi } from './pages/Translations';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    resources: {
      vi: { translation: translationVi },
      en: { translation: translationEn },
    },
    debug: true,
    lng: "vi",
    fallbackLng: 'vi',
    nonExplicitSupportedLngs: true,

    interpolation: {
      escapeValue: false,
    },
    detection: {
      //order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
  });
