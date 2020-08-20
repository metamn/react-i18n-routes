import { kebabCase } from "lodash";

import { getCurrentLang, getURLPrefix } from "../LanguageSelector";

/**
 * Generates routes for a language
 */
const routesForLanguage = props => {
  const { routes, language, i18n, doPrefixLanguage } = props;
  const { alternateName: languageCode } = language;

  const translations = [];

  return (
    routes &&
    routes.map(item => {
      const { path, component } = item;
      const { name: componentName } = component;

      const langF = i18n.getFixedT(languageCode, componentName);

      /**
       * Home is a special case
       */
      if (path === "/") {
        const translation = langF(kebabCase(componentName));

        translations.push({
          path: "",
          translation: `/${translation}`
        });

        return { ...item, path: `/${translation}` };
      }

      const splits = path.split("/");

      const translatedPath = splits
        .map(split => {
          if (split === ":slug") return split;

          const alreadyTranslated = translations.find(t => t.path === split);

          if (alreadyTranslated && alreadyTranslated.translation)
            return alreadyTranslated.translation;

          const translationFromi18n = langF(kebabCase(componentName));

          if (translationFromi18n) {
            translations.push({
              path: split,
              translation: translationFromi18n
            });
            return translationFromi18n;
          }
        })
        .join("/");

      return { ...item, path: translatedPath };
    })
  ).reverse();
};

const routesForLanguage2 = props => {
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

      //console.log("slug:", slug);

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
 *
 * - It loops through breadcrumbs
 * - Looks up breadcrumb in old routes
 * - Finds new slug on new routes
 * - If the new slug is not found it means it must be translated via an API call
 * - Since we can't make an async API call here we will return the query to the component where it will be executed
 *
 * - Returns: { url: the translated url, queries: API query strings }
 * - Ex.: { url: '/articles/', queries: [] }
 * - Ex.: { url: '/articles/{query-1}', queries: ['/api/article/article-2-ro/en-US'] }
 */
const updateURL = props => {
  const { breadcrumbs, i18n, routes, oldLanguage } = props;

  const currentLanguage = getCurrentLang(i18n);

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

  //console.log("oldRoutes:", oldRoutes);
  //console.log("currentRoutes:", currentRoutes);

  let lastResource = null;
  let queries = [];

  const urlParts =
    breadcrumbs &&
    breadcrumbs
      .map(item => {
        const { breadcrumb } = item;
        const { key } = breadcrumb;

        let newKey = "";

        const componentForKey = oldRoutes.find(item => item.path === key);

        //console.log("breadcrumb:", breadcrumb);
        console.log("key:", key);
        //console.log("componentForKey:", componentForKey);

        if (componentForKey) {
          lastResource = componentForKey;

          const componentForNewKey = currentRoutes.find(
            item => item.component === componentForKey.component
          );

          if (componentForNewKey) {
            const { path } = componentForNewKey;
            newKey = path;
          }
        } else {
          /**
           * Loads a resource from the API
           *
           * - We reach here for keys like '/', 'articles/article-2', '/ro/articles-ro/article-2-ro'
           * - OR '/articles-hu/article-1-hu/comment-1-hu'
           * - OR '/articles-hu/article-1-hu/comments-hu'
           * - So we'll find the last slug
           * - And do an API call with the last slug and the new language code
           * - The resource to call is saved earlier into `lastResource`
           */
          const split = key.split("/");
          const slug = split.pop();

          if (slug && lastResource) {
            const { component } = lastResource;
            const { defaultProps } = component;
            const { api } = defaultProps;
            const { endpointForResource } = api;

            // TODO: We need a call here to the parent resource (Article) to tell what to do with it's children

            console.log("endpointForResource:", endpointForResource);

            if (!endpointForResource) return null;

            queries.push(`${endpointForResource}/${slug}/${currentLanguage}`);
            return `/{query-${queries.length}}`;
          }
        }

        return newKey ? newKey : null;
      })
      .filter(item => item !== null);

  console.log("urlParts:", urlParts);
  console.log("queries:", queries);

  return { url: urlParts.join("").replace("//", "/"), queries: queries };
};

export { routesForLanguage, updateURL };
