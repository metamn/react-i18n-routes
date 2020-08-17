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

/**
 * Removes the second part of the locale
 *
 * Ex: 'hu-HU' > 'hu'
 */
const prettifyLocale = locale => {
  const split = locale.split("-");
  return split[0] ? split[0] : "";
};

/**
 * Adds a locale prefix to a current path
 */
const addPrefix = props => {
  const { current, i18n } = props;

  const currentLang = getCurrentLang(i18n);
  const prettyfiedCurrentLang = prettifyLocale(currentLang);

  return `/${prettyfiedCurrentLang}/${current}`;
};

/**
 * Adds a prefix to a path
 *
 * Ex: /prefix/path
 */
const prefixPath = props => {
  const { path, prefix } = props;

  return `/${prefix}${path}`;
};

export {
  getCurrentLang,
  getDefaultLang,
  isCurrentLangTheDefaultLang,
  prettifyLocale,
  prefixPath,
  addPrefix
};
