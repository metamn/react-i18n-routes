import { kebabCase } from "lodash";

import { getCurrentLang, getURLPrefix } from "../LanguageSelector";

/**
 * Generates routes for a language
 */
const routesForLanguage = props => {
  const { routes, language, i18n, doPrefixLanguage } = props;
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
          : doPrefixLanguage
          ? `${languagePrefixNormalized}/${slug}`
          : `/${slug}`;

      return { ...item, path: path };
    })
  );
};

/**
 * Updates the URL on language change
 */
const updateURL = props => {
  const { breadcrumbs, i18n, routes, oldLanguage } = props;

  const currentLanguage = getCurrentLang(i18n);
  //console.log("currentLanguage:", currentLanguage);
  //console.log("oldLanguage:", oldLanguage);

  const currentRoutes = routesForLanguage({
    routes: routes,
    language: { alternateName: currentLanguage },
    i18n: i18n,
    doPrefixLanguage: false
  });

  const oldRoutes = routesForLanguage({
    routes: routes,
    language: { alternateName: oldLanguage },
    i18n: i18n,
    doPrefixLanguage: true
  });

  console.log("currentRoutes:", currentRoutes);
  console.log("oldRoutes:", oldRoutes);

  const urlParts =
    breadcrumbs &&
    breadcrumbs
      .map(item => {
        const { breadcrumb } = item;
        const { key } = breadcrumb;

        let newKey = "";

        console.log("key:", key);
        const componentForKey = oldRoutes.find(item => item.path === key);
        if (componentForKey) {
          //console.log("componentForKey:", componentForKey.component);
          const componentForNewKey = currentRoutes.find(
            item => item.component === componentForKey.component
          );
          //console.log("componentForNewKey:", componentForNewKey);
          if (componentForNewKey) {
            const { path } = componentForNewKey;
            newKey = path;
            console.log("newKey:", newKey);
          }
        }

        return newKey ? newKey : null;
      })
      .filter(item => item !== null);

  console.log("urlParts:", urlParts);

  return urlParts.join("").replace("//", "/");
};

export { routesForLanguage, updateURL };
