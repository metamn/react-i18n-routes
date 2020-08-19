/**
 * Defines the data requirements for the component
 *
 * @see Article.md for details
 */
import PropTypes from "prop-types";
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import { CommentsPropTypes, CommentsDefaultProps } from "../Comments";

/**
 * Defines the prop types
 *
 * // NOTE: 1. Resources are coming from the DB. They don't need to be localized.
 */
const propTypes = {
  id: PropTypes.string,
  slug: PropTypes.string,
  name: PropTypes.string,
  comments: PropTypes.shape(CommentsPropTypes)
};

/**
 * Defines the default props
 */
const defaultProps = {
  id: shortid.generate(),
  slug: "article",
  name: "Article",
  comments: CommentsDefaultProps
};

export { propTypes, defaultProps };
