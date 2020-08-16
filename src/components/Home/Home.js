/**
 * Component short description
 *
 * @see Home.md for details
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
import {
  routesGenerateSlug,
  routesGetCurrentLang,
  routesAddPrefix
} from "../Routes";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Home.data";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Home.lang.ro-ro";
import { en_us } from "./Home.lang.en-us";

i18n.addResourceBundle("ro-RO", "Home", ro_ro);
i18n.addResourceBundle("en-US", "Home", en_us);

/**
 * Displays the component
 */
const Home = props => {
  const { articles: defaultArticles, routes } = props;
  const { items: defaultArticlesItems } = defaultArticles;
  const { t, i18n } = useTranslation("Home");
  const { t: tArticles } = useTranslation("Articles");

  /**
   * Loads articles from the server
   */
  const [articles, setArticles] = useState(defaultArticlesItems);

  /**
   * Re-loads articles from server when the language is changed
   */
  const currentLang = routesGetCurrentLang(i18n);

  useEffect(() => {
    fetch(`/api/articles/${currentLang}`)
      .then(response => response.json())
      .then(json => setArticles(json.articles));
  }, [currentLang]);

  // NOTE: 7. Resource containers should provide their localized name to other components
  // NOTE: 7a. They do via t(). We don't need anything else here
  const articlesName = tArticles("Articles");

  // NOTE: 7b. Resource containers should provide their slug to other components. Otherwise the same function with the same settings (`routesGenerateSlug`) should be used to generate the slug across the project.
  const articlesSlug = routesAddPrefix({
    current: tArticles("articles"),
    i18n: i18n
  });

  /**
   * Articles with internal links
   */
  const articlesList =
    articles &&
    articles.map(item => {
      const { id, name, slug } = item;

      // NOTE: 8. Or they should provide a `List` function to other components
      const articleSlug = `/${articlesSlug}/${slug}`;

      return (
        <li key={id}>
          <Link to={articleSlug}>{t(name)}</Link>
        </li>
      );
    });

  /**
   * Articles with external links
   */
  const articlesList2 =
    articles &&
    articles.map(item => {
      const { id, name, slug } = item;
      const articleSlug = `/${articlesSlug}/${slug}`;

      return (
        <li key={id}>
          <a href={articleSlug} target="blank">
            {t(name)}
          </a>
        </li>
      );
    });

  return (
    <Layout>
      <ol>
        <li key="2">
          {t("Access articles through the archive")}:&nbsp;
          <Link to={`/${articlesSlug}`}>{articlesName}</Link>.
        </li>

        <li key="1">
          <p>{t("Access articles directly")}:</p>
          <ul>{articlesList}</ul>
        </li>

        <li key="3">
          <p>{t("Open articles in antother tab")}:</p>
          <ul>{articlesList2}</ul>
        </li>
      </ol>
    </Layout>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes as HomePropTypes, defaultProps as HomeDefaultProps };
