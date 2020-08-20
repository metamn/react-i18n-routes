/**
 * Defines the data requirements for the component
 *
 * @see Comment.md for details
 */
import PropTypes from "prop-types";
import shortid from "shortid";

/**
 * Defines the prop types
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
  slug: "comment",
  name: "Comment",
  apiEndpoint: "/api/comment"
};

export { propTypes, defaultProps };
