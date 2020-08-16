/**
 * Gets the current language
 */
const getCurrentLang = i18n => {
  return i18n && i18n.language ? i18n.language : "";
};

/**
 * Gets the default language
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
 * Ads a prefix to a path
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
  prefixPath
};
