import { kebabCase } from "lodash";

/**
 * Generates a slug from a label
 *
 * Ex: 'Foo Bar' => 'foo-bar'
 */
const generateSlug = props => {
  const { name, t } = props;

  /**
   * If there is a translation file the slug will be localized
   */
  const translatedName = t ? t(name) : name;

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
   * Loads languages
   */
  const defaultLang =
    i18n && i18n.options && i18n.options.lng ? i18n.options.lng : "";

  const currentLang = i18n && i18n.language ? i18n.language : "";

  /**
   * Returns no prefix for the default lang
   */
  if (defaultLang === currentLang) return routes;

  /**
   * Removes the second part of the locale
   * Ex: 'hu-HU' > 'hu'
   */
  const split = currentLang.split("-");
  const currentLangPrefix = split[0] ? split[0] : "";

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
 * Ex: ['/destinations', '/account'] => ['/destinatii', '/cont']
 */
const localizeRoutes = props => {
  const { routes, t } = props;

  return (
    routes &&
    routes.map(item => {
      const { path } = item;
      return { ...item, path: localizePath({ path: path, t: t }) };
    })
  );
};

export { localizeRoutes, localizePath, prefixRoutes, generateSlug };
