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
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import RouteNotFound from "../RouteNotFound";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Routes.data";

/**
 * Imports logic
 */
import { localizeRoutes, localizePath, prefixRoutes } from "./Routes.logic";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Routes.lang.ro-ro";
import { hu_hu } from "./Routes.lang.hu-hu";
import { en_us } from "./Routes.lang.en-us";
import { de_de } from "./Routes.lang.de-de";

i18n.addResourceBundle("ro-RO", "Routes", ro_ro);
i18n.addResourceBundle("hu-HU", "Routes", hu_hu);
i18n.addResourceBundle("en-US", "Routes", en_us);
i18n.addResourceBundle("de-DE", "Routes", de_de);

/**
 * Displays the component
 */
const Routes = props => {
  const { routes } = props;
  const { t, i18n } = useTranslation("Routes");

  const routesList =
    routes &&
    routes
      .map(route => {
        const { id } = route;

        return <Route key={id} {...route} />;
      })
      // NOTE: 9. Invalid routes are catched at top level
      .concat([
        <Route key={shortid.generate()} path="*">
          <RouteNotFound />
        </Route>
      ]);

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
  localizePath as routesLocalizePath
};
