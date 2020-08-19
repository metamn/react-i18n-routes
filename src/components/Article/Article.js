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

/**
 * Imports other components and hooks
 */
import Layout from "../Layout";
import Comments from "../Comments";

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
import { en_us } from "./Article.lang.en-us";
import { hu_hu } from "./Article.lang.hu-hu";

i18n.addResourceBundle("ro-RO", "Article", ro_ro);
i18n.addResourceBundle("en-US", "Article", en_us);
i18n.addResourceBundle("hu-HU", "Article", hu_hu);

/**
 * Displays the component
 */
const Article = props => {
  const { slug: defaultSlug, comments } = props;
  const { t } = useTranslation("Article");

  // NOTE: Resources parse the URL to get their unique slug id
  const {
    params: { slug: slugFromURL }
  } = useRouteMatch();

  const slugForQuery = slugFromURL ? slugFromURL : defaultSlug;

  // NOTE: Resources query the DB and load their own data
  const [article, setArticle] = useState(props);

  useEffect(() => {
    fetch(`/api/article/${slugForQuery}`)
      .then(response => response.json())
      .then(json => setArticle(json.article));
  }, [slugForQuery]);

  /**
   * Parses the received data
   */
  const { name, slug, id } = article;

  return (
    <Layout>
      <dl>
        <dt>{t("Name")}:</dt>
        <dd>{name}</dd>
        <dt>{t("Slug")}:</dt>
        <dd>{slug}</dd>
        <dt>{t("Comments")}:</dt>
        <dd>
          <Comments {...comments} articleID={id} />
        </dd>
      </dl>
    </Layout>
  );
};

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default Article;
export { propTypes as ArticlePropTypes, defaultProps as ArticleDefaultProps };
