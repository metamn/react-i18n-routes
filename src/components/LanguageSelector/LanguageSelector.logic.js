import { startCase } from "lodash";

/**
 * Gets language from URL
 */
const getLanguageFromURL = props => {
  const { breadcrumbs, currentLanguage, languages } = props;

  // Initialize the return value
  let languageFromURL = currentLanguage;

  // breadcrumbs[0] is always '/'
  // breadcrumbs[1] might be the language
  const breadcrumbForLang = breadcrumbs[1];

  // breadcrumbs[1] is a breadcrumb
  if (breadcrumbs[1]?.key) {
    // /ro
    const key = breadcrumbs[1].key;

    // ro
    const split = key.split("/");
    const keyWithoutSlash = split[1] ? split[1] : "";

    // ro-RO
    const language = languages.find(
      item => item.displayName === startCase(keyWithoutSlash)
    );

    // Overwrite the return value if necessary
    languageFromURL = language ? language.alternateName : currentLanguage;
  }

  return languageFromURL;
};

/**
 * Gets the current language
 */
const getCurrentLang = i18n => {
  return i18n && i18n.language ? i18n.language : "";
};

/**
 * Gets the default language
 *
 * Returns the full language code like `en-US`
 */
const getDefaultLang = i18n => {
  return i18n && i18n.options && i18n.options.lng ? i18n.options.lng : "";
};

/**
 * Checks if the current lang is the default lang
 */
const isCurrentLangTheDefaultLang = i18n => {
  return getDefaultLang(i18n) === getCurrentLang(i18n);
};

export {
  getCurrentLang,
  getDefaultLang,
  isCurrentLangTheDefaultLang,
  getLanguageFromURL
};
