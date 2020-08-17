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

      const langF = i18n.getFixedT(languageCode, componentName);
      const label = langF(componentName);
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
