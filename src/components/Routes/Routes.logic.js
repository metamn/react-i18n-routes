import { kebabCase } from "lodash";

import {
  getCurrentLang,
  getDefaultLang,
  isCurrentLangTheDefaultLang,
  prettifyLocale,
  prefixPath,
  addPrefix
} from "./Routes.logic.helpers";

/**
 * Generates routes for a language
 */
const routesForLanguage = props => {
  const { routes, language, i18n } = props;
  const { alternateName: languageCode } = language;

  return (
    routes &&
    routes.map(item => {
      const { component } = item;
      const { name: componentName } = component;

      const langF = i18n.getFixedT(languageCode, componentName);
      const label = langF(componentName);
      const slug = langF(kebabCase(componentName));

      console.log("slug:", slug);

      return { ...item, path: slug };
    })
  );
};

/**
 * Updates the URL on language change
 */
const updateURL = props => {
  const { i18n } = props;

  if (isCurrentLangTheDefaultLang(i18n)) return "/";

  return addPrefix({ current: "", i18n: i18n });
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

  const prefixed = prefixRoutes({ routes: localized, i18n: i18n });

  return prefixed;
};

export {
  localizeRoutes,
  localizePath,
  prefixRoutes,
  generateSlug,
  updateURL,
  getCurrentLang,
  addPrefix,
  routesForLanguage,
  getDefaultLang
};
