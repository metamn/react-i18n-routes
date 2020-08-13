/**
 * Defines the data requirements for the component
 *
 * @see Home.md for details
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
  articles: PropTypes.arrayOf(PropTypes.shape(ArticlePropTypes))
};

/**
 * Defines the default props
 */
const defaultProps = {
  articles: Array(3)
    .fill(ArticleDefaultProps)
    .map((item, index) => {
      return {
        ...item,
        id: shortid.generate(),
        name: `Article ${index + 10}`,
        slug: `article-${index + 10}`
      };
    })
};

export { propTypes, defaultProps };
