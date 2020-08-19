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
import { CommentPropTypes, CommentDefaultProps } from "../Comment";

/**
 * Defines the prop types
 */
const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(CommentPropTypes)),
  articleID: PropTypes.string,
  api: PropTypes.shape({
    endpointForCollection: PropTypes.string,
    endpointForResource: PropTypes.string
  })
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
  articleID: "1",
  api: {
    endpointForCollection: "/api/comments",
    endpointForResource: "/api/comment"
  }
};

export { propTypes, defaultProps };
