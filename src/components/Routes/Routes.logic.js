import { kebabCase } from "lodash";

import {
  getCurrentLang,
  getDefaultLang,
  isCurrentLangTheDefaultLang
} from "../LanguageSelector";

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

      // NOTE: This is a fix. `t` cannot get translations from another language, just form the current one. With `i18n.getFixedT` we can load translations from any language files, nut just the current one.
      const langF = i18n.getFixedT(languageCode, componentName);
      const slug = langF(kebabCase(componentName));

      return { ...item, path: slug };
    })
  );
};

/**
 * Updates the URL on language change
 */
const updateURL = props => {
  const { breadcrumbs, i18n } = props;

  const currentLanguage = getCurrentLang(i18n);

  const urlParts =
    breadcrumbs &&
    breadcrumbs.map(item => {
      const { breadcrumb } = item;
      const { props } = breadcrumb;
      const { children } = props;

      const langF = i18n.getFixedT(currentLanguage, children);
      const slug = langF(kebabCase(children));

      if (slug === kebabCase(children)) {
        console.log("Slug is a resource:", slug);
        return `/${slug}`;
      }

      return slug;
    });

  console.log("urlParts:", urlParts);

  return urlParts.map(item => item).join("");
};

export {
  routesForLanguage,
  updateURL,
  getCurrentLang,
  getDefaultLang,
  isCurrentLangTheDefaultLang
};
