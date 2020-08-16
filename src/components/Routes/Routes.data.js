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
  items: null
};

export { propTypes, defaultProps };
