import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../../../public/locales/en/en.json";
import ruTranslations from "../../../public/locales/ru/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    ru: { translation: ruTranslations },
  },
  lng: "en", // язык по умолчанию
  fallbackLng: "en", // язык, используемый при отсутствии перевода
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
