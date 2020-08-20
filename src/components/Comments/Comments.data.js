/**
 * Defines the data requirements for the component
 *
 * @see Comments.md for details
 */
import PropTypes from "prop-types";
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import Comment, { CommentPropTypes, CommentDefaultProps } from "../Comment";
import { RoutesPropTypes } from "../Routes";

/**
 * Defines the prop types
 */
const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(CommentPropTypes)),
  routes: PropTypes.shape(RoutesPropTypes),
  articleID: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  items: Array(3)
    .fill(CommentDefaultProps)
    .map((item, index) => {
      return {
        ...item,
        id: shortid.generate(),
        name: `Comment ${index + 1}a`,
        slug: `comment-${index + 1}a`
      };
    }),
  routes: {
    items: [
      {
        id: shortid.generate(),
        path: "/articles/:slug/comments/:slug",
        component: Comment
      }
    ]
  },
  articleID: "1",
  api: {
    endpointForCollection: "/api/comments",
    endpointForResource: "/api/comment"
  }
};

export { propTypes, defaultProps };
