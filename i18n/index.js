import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../i18n/locales/en/translation.json";
import vi from "../i18n/locales/vi/translation.json";

export const fallbackLng = "en";
export const languages = [fallbackLng, "vi"];
export const defaultNS = "translation";

const options = {
  lng: "vi",
  resources: {
    en,
    vi,
  },
  react: {
    useSuspense: false,
  },
};

i18next.use(initReactI18next).init(options);

export default i18next;
