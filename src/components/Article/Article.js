/**
 * Component short description
 *
 * @see Article.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import clsx from "clsx";

/**
 * Imports other components and hooks
 */

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Article.data";

/**
 * Imports Material UI components
 */
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Article.lang.ro-ro";
import { hu_hu } from "./Article.lang.hu-hu";
import { en_us } from "./Article.lang.en-us";
import { de_de } from "./Article.lang.de-de";

i18n.addResourceBundle("ro-RO", "Article", ro_ro);
i18n.addResourceBundle("hu-HU", "Article", hu_hu);
i18n.addResourceBundle("en-US", "Article", en_us);
i18n.addResourceBundle("de-DE", "Article", de_de);

/**
 * Styles the component
 */
const useStyles = makeStyles(theme => ({
  container: {}
}));

/**
 * Displays the component
 */
const Article = props => {
  const { name } = props;
  const { container } = useStyles(props);
  const { t } = useTranslation("Article");

  return <h5>{name}</h5>;
};

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default Article;
export { propTypes as ArticlePropTypes, defaultProps as ArticleDefaultProps };
