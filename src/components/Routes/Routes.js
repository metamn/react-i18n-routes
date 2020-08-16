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
 * Imports data
 */
import { propTypes, defaultProps } from "./Routes.data";

/**
 * Imports logic
 */
import {
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
  const { items } = props;
  const { t, i18n } = useTranslation("Routes");

  const routesList =
    items &&
    items.map(item => {
      const { id } = item;

      return <Route key={id} {...item} />;
    });

  return (
    <Router>
      <Switch>{routesList}</Switch>
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
