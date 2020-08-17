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

export { prettifyLocale, prefixPath, addPrefix };
