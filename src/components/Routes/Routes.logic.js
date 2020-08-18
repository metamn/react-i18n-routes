import { kebabCase } from "lodash";

import { getCurrentLang, getURLPrefix } from "../LanguageSelector";

/**
 * Generates routes for a language
 */
const routesForLanguage = props => {
  const { routes, language, i18n } = props;
  const { alternateName: languageCode } = language;

  const langF1 = i18n.getFixedT(languageCode, "Home");
  const languagePrefix = langF1("home");
  const languagePrefixNormalized =
    languagePrefix !== "" ? `/${languagePrefix}` : languagePrefix;

  return (
    routes &&
    routes.map(item => {
      const { component } = item;
      const { name: componentName } = component;

      // NOTE: This is a fix. `t` cannot get translations from another language, just form the current one. With `i18n.getFixedT` we can load translations from any language files, nut just the current one.
      const langF = i18n.getFixedT(languageCode, componentName);
      const slug = langF(kebabCase(componentName));

      // NOTE: Routes, except for the home component, are prefixed with language code
      const path =
        componentName === "Home"
          ? `/${slug}`
          : `${languagePrefixNormalized}/${slug}`;

      return { ...item, path: path };
    })
  );
};

/**
 * Updates the URL on language change
 */
const updateURL = props => {
  const { breadcrumbs, i18n } = props;

  const currentLanguage = getCurrentLang(i18n);
  console.log("currentLanguage:", currentLanguage);

  const urlParts =
    breadcrumbs &&
    breadcrumbs.map(item => {
      const { breadcrumb } = item;
      const { props } = breadcrumb;
      const { children } = props;

      const langF = i18n.getFixedT(currentLanguage, children);
      const slug = langF(kebabCase(children));

      console.log("breadcrumb:", breadcrumb);
      console.log("children:", children);
      console.log("slug:", slug);

      if (slug === kebabCase(children)) {
        console.log("Slug is a resource:", slug);
        return `/${slug}`;
      }

      return `/${slug}`;
    });

  console.log("urlParts:", urlParts);

  return urlParts.map(item => item).join("");
};

export { routesForLanguage, updateURL };
