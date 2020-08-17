/**
 * Component short description
 *
 * @see Articles.md for details
 */

/**
 * Imports React and third party packages
 */
import React, { useState, useEffect } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

/**
 * Imports other components and hooks
 */
import Layout from "../Layout";
import Article from "../Article";
import { getCurrentLang } from "../LanguageSelector";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Articles.data";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Articles.lang.ro-ro";
import { en_us } from "./Articles.lang.en-us";

i18n.addResourceBundle("ro-RO", "Articles", ro_ro);
i18n.addResourceBundle("en-US", "Articles", en_us);

/**
 * Displays the component
 */
const Articles = props => {
  const { items: defaultArticles } = props;
  const { t, i18n } = useTranslation("Articles");

  /**
   * Loads articles from the server
   */
  const [articles, setArticles] = useState(defaultArticles);

  /**
   * Re-loads articles from server when the language is changed
   */
  const currentLang = getCurrentLang(i18n);

  useEffect(() => {
    fetch(`/api/articles/${currentLang}`)
      .then(response => response.json())
      .then(json => setArticles(json.articles));
  }, [currentLang]);

  // NOTE: Resource container slugs are coming from the language file, too.
  const articlesSlug = t("articles");

  const articlesList =
    articles &&
    articles.map(item => {
      const { id, name, slug } = item;

      // NOTE: Resource containers are responsible to compose up complete, nested links pointing to their childrens
      const articleSlug = `${articlesSlug}/${slug}`;

      return (
        <li key={id}>
          <Link to={articleSlug}>{t(name)}</Link>
        </li>
      );
    });

  // NOTE: Resource containers manage routes to their children
  const match = useRouteMatch();
  const { path } = match;

  return (
    <Switch>
      <Route path={`${path}/:slug`}>
        <Article />
      </Route>
      <Route path={path}>
        <Layout>
          <ul>{articlesList}</ul>
        </Layout>
      </Route>
    </Switch>
  );
};

Articles.propTypes = propTypes;
Articles.defaultProps = defaultProps;

export default Articles;
export { propTypes as ArticlesPropTypes, defaultProps as ArticlesDefaultProps };
