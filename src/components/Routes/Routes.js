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
 */
import { LanguageSelectorDefaultProps } from "../LanguageSelector";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Routes.data";

/**
 * Imports logic
 */
import {
  collectTranslationFilenames,
  routesForLanguage,
  localizeRoutes,
  localizePath,
  prefixRoutes,
  generateSlug,
  updateURL,
  getCurrentLang,
  addPrefix
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
  const { t, i18n } = useTranslation("Routes");

  // NOTE: How to load translations outside the current language. See https://github.com/i18next/react-i18next/issues/896
  const ro = i18n.getFixedT("ro-RO", "Articles");
  console.log("ro:", ro("Articles"));

  /**
   * Loads all languages
   */
  const { languages } = LanguageSelectorDefaultProps;

  /**
   * Creates routes for all languages
   */
  const routesForLanguages =
    languages &&
    languages.map(language =>
      routesForLanguage({ routes: routes, language: language, t: t })
    );

  return (
    <Router>
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
  localizePath as routesLocalizePath,
  generateSlug as routesGenerateSlug,
  updateURL as routesUpdateURL,
  getCurrentLang as routesGetCurrentLang,
  addPrefix as routesAddPrefix
};
