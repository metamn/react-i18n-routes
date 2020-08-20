import { kebabCase } from "lodash";

import { getCurrentLang, getURLPrefix } from "../LanguageSelector";

/**
 * Generates routes for a language
 */
const routesForLanguage = props => {
  const { routes, language, i18n, doPrefixLanguage } = props;
  const { alternateName: languageCode } = language;

  const translations = [];

  const results =
    routes &&
    routes
      .map(item => {
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
          .join("/")
          .replace("//", "/");

        return { ...item, path: translatedPath };
      })
      .reverse();

  return results;
};

/**
 * Const finds a key from oldRoutes in currentRoutes
 */
const findNewKey = props => {
  const { oldRoutes, currentRoutes, key } = props;

  let newKey = null;

  const componentForKey = oldRoutes.find(item => item.path === key);

  if (componentForKey) {
    const componentForNewKey = currentRoutes.find(
      item => item.component === componentForKey.component
    );

    if (componentForNewKey) {
      const { path } = componentForNewKey;
      newKey = path;
    }
  }

  return newKey;
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

  let saved = null;
  let queries = [];

  console.log("oldRoutes:", oldRoutes);
  console.log("currentRoutes:", currentRoutes);

  const urlParts =
    breadcrumbs &&
    breadcrumbs
      .map(item => {
        const { breadcrumb } = item;
        const { key } = breadcrumb;

        let newKey = null;

        /**
         * Step1: Looks for a direct match
         *
         * Ex. /, /articles
         */
        newKey = findNewKey({
          oldRoutes: oldRoutes,
          currentRoutes: currentRoutes,
          key: key
        });

        if (newKey) return newKey;

        /**
         * Step 2: Looks for a match with :slug
         *
         * Ex.: /articles/article-1
         */
        const keyWithSlug = key.split("/").slice(0, -1);
        const keyWithSlug2 = [...keyWithSlug, ":slug"].join("/");

        newKey = findNewKey({
          oldRoutes: oldRoutes,
          currentRoutes: currentRoutes,
          key: keyWithSlug2
        });

        if (newKey) {
          saved = { oldKey: key, currentKey: keyWithSlug2 };
          return newKey;
        }

        /**
         * Step 3: Looks for match with the help of a previous found
         *
         * Ex. /articles/article-1/comments
         */
        const { oldKey, currentKey } = saved;
        const keyWithReplacement = key.replace(oldKey, currentKey);

        newKey = findNewKey({
          oldRoutes: oldRoutes,
          currentRoutes: currentRoutes,
          key: keyWithReplacement
        });

        if (newKey) {
          saved = { oldKey: key, currentKey: keyWithReplacement };
          return newKey;
        }

        /**
         * Step 4: Looks for match with the help of a previous found + slug
         *
         * Ex. /articles/article-1/comments
         */
        const keyWithReplacementAndSlug = keyWithReplacement
          .split("/")
          .slice(0, -1);
        const keyWithReplacementAndSlug2 = [
          ...keyWithReplacementAndSlug,
          ":slug"
        ].join("/");

        newKey = findNewKey({
          oldRoutes: oldRoutes,
          currentRoutes: currentRoutes,
          key: keyWithReplacementAndSlug2
        });

        if (newKey) {
          return newKey;
        }
      })
      .filter(item => item !== null);

  console.log("urlParts:", urlParts);
};

const updateURL2 = props => {
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

  console.log("oldRoutes:", oldRoutes);
  console.log("currentRoutes:", currentRoutes);

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

        console.log("key:", key);

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

  const urlPartsNormalized =
    urlParts.length >= 1 ? urlParts.slice(1) : urlParts;

  console.log("queries:", queries);

  return { url: urlPartsNormalized.join(""), queries: queries };
};

export { routesForLanguage, updateURL };
