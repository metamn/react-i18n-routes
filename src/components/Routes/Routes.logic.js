import { kebabCase } from "lodash";

const updateURL = props => {
  const { i18n } = props;

  if (isCurrentLangTheDefaultLang(i18n)) return "/";

  const currentLang = getCurrentLang(i18n);
  const prettyLocale = prettifyLocale(currentLang);

  return `/${prettyLocale}`;
};

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
 * Generates a slug from a label
 *
 * Ex: 'Foo Bar' => 'foo-bar'
 */
const generateSlug = props => {
  const { name, t } = props;

  /**
   * If there is a translation file the slug will be localized
   * - If localization is not found for `name` it will fall back silently to `name` in the default language
   */
  const translatedName = t ? t(name, name) : name;

  return kebabCase(translatedName);
};

/**
 * Ads a perfix to a path
 *
 * Ex: /prefix/path
 */
const prefixPath = props => {
  const { path, prefix } = props;

  return `/${prefix}${path}`;
};

/**
 * Adds a language prefix for routes
 *
 * Ex: '/destinations' => '/en/destinations'
 */
const prefixRoutes = props => {
  const { routes, i18n } = props;

  /**
   * Return early
   */
  if (!i18n) return routes;

  /**
   * Returns no prefix for the default lang
   */
  if (isCurrentLangTheDefaultLang(i18n)) return routes;

  /**
   * Gets the prettyfied version of the current lang
   */
  const currentLang = getCurrentLang(i18n);
  const currentLangPrefix = prettifyLocale(currentLang);

  return (
    routes &&
    routes.map(item => {
      const { path } = item;

      return {
        ...item,
        path: prefixPath({ path: path, prefix: currentLangPrefix })
      };
    })
  );
};

/**
 * Translates a path
 *
 * Ex.: '/destinations' => '/destinatii'
 * Ex.: '/account?activeTab=0' => '/cont/activeTab=0'
 */
const localizePath = props => {
  const { path, t } = props;

  if (!path) return;

  const split = path.split("?");
  const queryParams = split[1] ? `?${split[1]}` : "";
  const pathWithoutQueryParams = split[0] ? split[0] : path;

  const pathWithoutSlash = pathWithoutQueryParams.substring(1);
  const pathWithoutSlashLocalized = t(pathWithoutSlash, "not-found");

  return pathWithoutSlashLocalized === "not-found"
    ? path
    : `/${pathWithoutSlashLocalized}${queryParams}`;
};

/**
 * Translates a set of route paths
 *
 * Ex: ['/destinations', '/account'] => ['/ro/destinatii', '/ro/cont']
 */
const localizeRoutes = props => {
  const { routes, t, i18n } = props;

  const localized =
    routes &&
    routes.map(item => {
      const { path } = item;

      return { ...item, path: localizePath({ path: path, t: t }) };
    });

  console.log("localized:", localized);

  const prefixed = prefixRoutes({ routes: localized, i18n: i18n });

  console.log("prefixed:", prefixed);

  return prefixed;
};

export { localizeRoutes, localizePath, prefixRoutes, generateSlug, updateURL };
