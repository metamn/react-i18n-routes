import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/**
 * Sets up translations
 *
 * - Every component manages it's own translations via namespaces
 * - Every component adds it's own translation items to `resources`
 *
 * @see https://github.com/i18next/react-i18next/issues/299
 * @see https://react.i18next.com/latest/usetranslation-hook#loading-namespaces
 *
 */
const resources = {};

/**
 * Sets up i18next
 *
 * @see https://react.i18next.com/latest/using-with-hooks
 */
i18n
  /**
   * Detects user language
   *
   * @see https://github.com/i18next/i18next-browser-languageDetector
   */
  .use(LanguageDetector)
  /**
   * Passes the i18n instance to react-i18next.
   */
  .use(initReactI18next)
  /**
   * Inits i18next
   *
   * @see https://www.i18next.com/overview/configuration-options
   */
  .init({
    resources,
    // NOTE: When the default language is updated also the slugs in `Home.lang` should be updated. The slug for Home in default language should be empty, on other languages prefixed with 'en' or 'ro' etc.
    lng: "hu-HU",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }

    // NOTE: For date and number localization see the Finsterdata project
  });

export default i18n;
