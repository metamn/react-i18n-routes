/**
 * Defines the data requirements for the component
 *
 * @see Routes.md for details
 */
import PropTypes from "prop-types";
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import Home from "../Home";
import Articles from "../Articles";
import RouteNotFound from "../RouteNotFound";

/**
 * Defines the prop types
 */
const propTypes = {
  routes: PropTypes.arrayOf(PropTypes.any)
};

/**
 * Defines the default props
 *
 * // NOTE: 9. Invalid routes are catched at top level
 */
const defaultProps = {
  routes: [
    { id: shortid.generate(), path: "/articles", component: Articles },
    { id: shortid.generate(), path: "/", exact: true, component: Home },
    { id: shortid.generate(), path: "*", component: RouteNotFound }
  ]
};

export { propTypes, defaultProps };
