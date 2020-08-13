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
  // NOTE: 0. Resource containers have their names and slug coming from the language files
  // FIXME: Remove name and slug
  name: PropTypes.string,
  slug: PropTypes.string,
  articles: PropTypes.arrayOf(PropTypes.shape(ArticlePropTypes))
};

/**
 * Defines the default props
 */
const defaultProps = {
  name: "Articles",
  slug: "articles",
  articles: Array(3)
    .fill(ArticleDefaultProps)
    .map((item, index) => {
      return {
        ...item,
        id: shortid.generate(),
        name: `Article ${index + 1}`,
        slug: `article-${index + 1}`
      };
    })
};

export { propTypes, defaultProps };
