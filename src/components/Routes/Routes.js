/**
 * Component short description
 *
 * @see Routes.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 * Imports other components and hooks
 *
 * // NOTE: Language selector should stay outside the layout. Otherwise on every click it will be re-rendered, thus re-initialized, thus the URL updated
 * // NOTE: Language selector should stay inside routes to be able to change the URL
 */
import LanguageSelector, {
  LanguageSelectorDefaultProps,
  getDefaultLang
} from "../LanguageSelector";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Routes.data";

/**
 * Imports logic
 */
import {
  routesForLanguage,
  updateURL,
  whatNeedsToBeTranslated,
  getTranslations
} from "./Routes.logic";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Routes.lang.ro-ro";
import { en_us } from "./Routes.lang.en-us";

i18n.addResourceBundle("ro-RO", "Routes", ro_ro);
i18n.addResourceBundle("en-US", "Routes", en_us);

/**
 * Displays the component
 */
const Routes = props => {
  const { items: routes } = props;
  const { i18n } = useTranslation("Routes");

  //console.log("routes:", routes);

  /**
   * Loads all languages
   */
  const { languages } = LanguageSelectorDefaultProps;

  /**
   * Re-orders languages
   * - The default language (without) prefix should be the last in the `<Route>` list
   * - Ex:
   * 	`<Route path='/ro' ...>`
   * 	`<Route path='/ro/articles' ...>`
   * 	`<Route path='/' ...>`
   * 	`<Route path='/articles' ...>`
   */
  const defaultLang = getDefaultLang(i18n);

  const languagesOrdered = languages.sort(item => {
    const { alternateName } = item;
    return alternateName === defaultLang ? 1 : -1;
  });

  /**
   * Creates routes for all languages
   * - This is needed to make direct URL access possible.
   * - Ex: `https://localhost/ro/articles-ro/article-1-ro` should be accessible from the URL bar whatever the current language is
   * - This way every URL on the site is made shareable
   */

  const routesForLanguages =
    languagesOrdered &&
    languagesOrdered.map(language => {
      const localizedRoutes = routesForLanguage({
        routes: routes,
        language: language,
        i18n: i18n,
        doPrefixLanguage: true
      });

      //console.log("localizedRoutes:", localizedRoutes);

      return (
        localizedRoutes &&
        localizedRoutes.map(item => {
          const { id } = item;

          return <Route key={id} {...item} />;
        })
      );
    });

  return (
    <Router>
      <LanguageSelector />
      <Switch>{routesForLanguages}</Switch>
    </Router>
  );
};

Routes.propTypes = propTypes;
Routes.defaultProps = defaultProps;

export default Routes;
export {
  propTypes as RoutesPropTypes,
  defaultProps as RoutesDefaultProps,
  updateURL as routesUpdateURL
};
