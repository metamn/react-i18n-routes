/**
 * Component short description
 *
 * @see Article.md for details
 */

/**
 * Imports React and third party packages
 */
import React, { useState, useEffect } from "react";
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

  // NOTE: 2. Resources parse the URL to get their unique id
  const {
    params: { slug: slugFromURL }
  } = useRouteMatch();

  const slugForQuery = slugFromURL ? slugFromURL : defaultSlug;

  // NOTE: 3. Resources query the DB and load their own data
  // const nameFromSlug = startCase(slug);
  const [article, setArticle] = useState(props);

  useEffect(() => {
    fetch(`/api/articles/${slugForQuery}`)
      .then(response => response.json())
      .then(json => setArticle(json.article));
  }, []);

  // Parsing the (received) data
  const { name, slug } = article;

  return (
    <Layout>
      <dl>
        <dt>{t("Name")}:</dt>
        <dd>{name}</dd>
        <dt>{t("Slug")}:</dt>
        <dd>{slug}</dd>
      </dl>
    </Layout>
  );
};

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default Article;
export { propTypes as ArticlePropTypes, defaultProps as ArticleDefaultProps };
