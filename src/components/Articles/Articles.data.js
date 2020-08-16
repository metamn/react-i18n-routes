/**
 * Defines the data requirements for the component
 *
 * @see Articles.md for details
 */
import PropTypes from "prop-types";
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import { ArticlePropTypes, ArticleDefaultProps } from "../Article";

/**
 * Defines the prop types
 */
const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(ArticlePropTypes))
};

/**
 * Defines the default props
 */
const defaultProps = {
  items: Array(3)
    .fill(ArticleDefaultProps)
    .map((item, index) => {
      return {
        ...item,
        id: shortid.generate(),
        name: `Article ${index + 1}a`,
        slug: `article-${index + 1}a`
      };
    })
};

export { propTypes, defaultProps };
