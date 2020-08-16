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
import Home, { HomeDefaultProps } from "../Home";
import RouteNotFound from "../RouteNotFound";

/**
 * Defines the prop types
 *
 * Ex.: { id: shortid.generate(), path: "/articles", component: Articles }
 */
const propTypes = {
  items: PropTypes.arrayOf(PropTypes.any)
};

/**
 * Defines the default props
 *
 */
const defaultProps = {
  items: [
    ...HomeDefaultProps.routes,
    { id: shortid.generate(), path: "/", exact: true, component: Home },
    { id: shortid.generate(), path: "*", component: RouteNotFound }
  ]
};

export { propTypes, defaultProps };
