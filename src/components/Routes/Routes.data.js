/**
 * Defines the data requirements for the component
 *
 * @see Routes.md for details
 */
import PropTypes from "prop-types";

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
 */
const defaultProps = {
  routes: [
    { path: "/articles", component: Articles },
    { path: "/", component: Home }
  ]
};

export { propTypes, defaultProps };
