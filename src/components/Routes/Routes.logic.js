import { kebabCase } from "lodash";

import {
  getCurrentLang,
  getDefaultLang,
  isCurrentLangTheDefaultLang,
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
  const { i18n } = props;

  if (isCurrentLangTheDefaultLang(i18n)) return "/";

  return addPrefix({ current: "", i18n: i18n });
};

export { routesForLanguage, updateURL, getCurrentLang, getDefaultLang };
