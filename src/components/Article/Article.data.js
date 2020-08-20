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
import Comments, { CommentsPropTypes, CommentsDefaultProps } from "../Comments";
import { RoutesPropTypes } from "../Routes";

/**
 * Defines the prop types
 *
 * // NOTE: 1. Resources are coming from the DB. They don't need to be localized.
 */
const propTypes = {
  id: PropTypes.string,
  slug: PropTypes.string,
  name: PropTypes.string,
  comments: PropTypes.shape(CommentsPropTypes),
  routes: PropTypes.shape(RoutesPropTypes)
};

/**
 * Defines the default props
 */
const defaultProps = {
  id: shortid.generate(),
  slug: "article",
  name: "Article",
  comments: CommentsDefaultProps,
  routes: {
    items: [
      ...CommentsDefaultProps.routes.items,
      {
        id: shortid.generate(),
        path: "/articles/:slug/comments",
        component: Comments
      }
    ]
  }
};

export { propTypes, defaultProps };
