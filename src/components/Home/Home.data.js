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
import { ArticlesPropTypes, ArticlesDefaultProps } from "../Articles";
import { RoutesPropTypes, RoutesDefaultProps } from "../Routes";

/**
 * Defines the prop types
 */
const propTypes = {
  articles: PropTypes.shape(ArticlesPropTypes),
  routes: PropTypes.shape(RoutesPropTypes)
};

/**
 * Defines the default props
 */
const defaultProps = {
  articles: ArticlesDefaultProps,
  routes: RoutesDefaultProps
};

export { propTypes, defaultProps };
