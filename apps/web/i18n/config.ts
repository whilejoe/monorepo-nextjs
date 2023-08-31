import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import caregiversEN from "../locales/en/caregivers.json";
import commonEN from "../locales/en/common.json";
import helpcenterEN from "../locales/en/help-center.json";
import homeEN from "../locales/en/home.json";
import registerEN from "../locales/en/register.json";
import selectaccessEN from "../locales/en/select-access.json";
import membersEN from "../locales/en/members.json";
import settingsEN from "../locales/en/settings.json";

import caregiversES from "../locales/es/caregivers.json";
import commonES from "../locales/es/common.json";
import helpcenterES from "../locales/es/help-center.json";
import homeES from "../locales/es/home.json";
import registerES from "../locales/es/register.json";
import selectaccessES from "../locales/es/select-access.json";
import membersES from "../locales/es/members.json";
import settingsES from "../locales/es/settings.json";
import ridesES from "../locales/es/rides.json";
import ridesEN from "../locales/en/rides.json";

export const resources = {
  en: {
    caregivers: caregiversEN,
    common: commonEN,
    helpcenter: helpcenterEN,
    home: homeEN,
    register: registerEN,
    selectaccess: selectaccessEN,
    members: membersEN,
    settings: settingsEN,
    rides: ridesEN,
  },
  es: {
    caregivers: caregiversES,
    common: commonES,
    helpcenter: helpcenterES,
    home: homeES,
    register: registerES,
    selectaccess: selectaccessES,
    members: membersES,
    settings: settingsES,
    rides: ridesES,
  },
};

i18next.use(HttpBackend).use(LanguageDetector).use(initReactI18next).init({
  resources,
  lng: "en", // if you're using a language detector, do not define the lng option
  debug: false,
});
