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
  items: PropTypes.arrayOf(PropTypes.shape(ArticlePropTypes)),
  // NOTE: The component should define it's API query endpoints. When the URL is translated this data is used to translate a resource via the API
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
    .fill(ArticleDefaultProps)
    .map((item, index) => {
      return {
        ...item,
        id: shortid.generate(),
        name: `Article ${index + 1}a`,
        slug: `article-${index + 1}a`
      };
    }),
  api: {
    endpointForCollection: "/api/articles",
    endpointForResource: "/api/article"
  }
};

export { propTypes, defaultProps };
