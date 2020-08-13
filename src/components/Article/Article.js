/**
 * Component short description
 *
 * @see Article.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";

/**
 * Imports other components and hooks
 */
import Layout from "../Layout";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Article.data";

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
 * Displays the component
 */
const Article = props => {
  const { name } = props;
  const { t } = useTranslation("Article");

  return (
    <Layout>
      <h5>Article: {t(name)}</h5>
    </Layout>
  );
};

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default Article;
export { propTypes as ArticlePropTypes, defaultProps as ArticleDefaultProps };
