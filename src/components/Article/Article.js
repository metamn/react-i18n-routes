/**
 * Component short description
 *
 * @see Article.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { startCase } from "lodash";

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
  const { slug: defaultSlug } = props;
  const { t } = useTranslation("Article");

  // NOTE: 0. Resources have to query their slugs
  const {
    params: { slug: slugFromURL }
  } = useRouteMatch();

  const slug = slugFromURL ? slugFromURL : defaultSlug;

  const nameFromSlug = startCase(slug);

  return (
    <Layout>
      <h5>
        Name: {nameFromSlug}, slug: {slug}
      </h5>
    </Layout>
  );
};

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default Article;
export { propTypes as ArticlePropTypes, defaultProps as ArticleDefaultProps };
