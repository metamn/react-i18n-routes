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
 * // FIXME: translated routes has to be generated, not manually added (?)
 */
const defaultProps = {
  routes: [
    { id: shortid.generate(), path: "/articles", component: Articles },
    { id: shortid.generate(), path: "/", exact: true, component: Home }
  ]
};

export { propTypes, defaultProps };
