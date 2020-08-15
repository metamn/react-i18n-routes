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
import {
  localizeRoutes,
  localizePath,
  prefixRoutes,
  generateSlug
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
  const { routes } = props;
  const { t, i18n } = useTranslation("Routes");

  /**
   * Collects all resource container translations
   */
  const { t: tResourceContainers } = useTranslation("Articles");

  /**
   * Handles 404 routes
   */
  const routeNotFound = (
    <Route
      key={shortid.generate()}
      {...{ path: "*", component: RouteNotFound }}
    />
  );

  /**
   * Displays routes on default language
   */
  const routesList =
    routes &&
    routes.map(route => {
      const { id } = route;

      return <Route key={id} {...route} />;
    });

  /**
   * Displays routes on localized language
   */
  const localizedRoutesList = localizeRoutes({
    routes: routesList,
    t: tResourceContainers
  });

  /**
   * Merges all route lists
   */
  const display = [...routesList, routeNotFound];

  return (
    <Router>
      <Switch>{display}</Switch>
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
  generateSlug as routesGenerateSlug
};
