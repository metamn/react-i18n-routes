/**
 * Defines the data requirements for the component
 *
 * @see Article.md for details
 */
import PropTypes from "prop-types";
import shortid from "shortid";

/**
 * Defines the prop types
 *
 * // NOTE: 1. Resources are coming from the DB
 */
const propTypes = {
  id: PropTypes.string,
  slug: PropTypes.string,
  name: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  id: shortid.generate(),
  slug: "article",
  name: "Article"
};

export { propTypes, defaultProps };
