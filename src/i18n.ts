import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Translations from "./resources/Translations";
import LanguageDetector from "i18next-browser-languagedetector"

const DETECTION_OPTIONS = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  supportedLngs: ["en", "ru"],
  fallbackLng: ["en"],
  detection: DETECTION_OPTIONS,
  resources: Translations,
});
export default i18n;
