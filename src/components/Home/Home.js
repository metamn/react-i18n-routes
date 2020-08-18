/**
 * Component short description
 *
 * @see Home.md for details
 */

/**
 * Imports React and third party packages
 */
import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import shortid from "shortid";

/**
 * Imports other components and hooks
 */
import Layout from "../Layout";
import { getCurrentLang } from "../LanguageSelector";

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
  const { articles: defaultArticles } = props;
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
  const currentLang = getCurrentLang(i18n);

  useEffect(() => {
    fetch(`/api/articles/${currentLang}`)
      .then(response => response.json())
      .then(json => setArticles(json.articles));
  }, [currentLang]);

  /**
   * Loads the current URL
   */
  const match = useRouteMatch();
  const { path } = match;

  /**
   * `path` works only when id not `/`.
   * When it is `/` the domain part of the URL is missing
   */
  const path2 = path === "/" ? "" : path2;

  // NOTE: Resource containers provide their localized name to other components
  const articlesName = tArticles("Articles");

  // NOTE: Resource containers provide their slug to other components.
  const articlesSlug = tArticles("articles");

  /**
   * Displays articles with internal links (Router Link)
   */
  const articlesList =
    articles &&
    articles.map(item => {
      const { id, name, slug } = item;
      const articleSlug = `${path2}/${articlesSlug}/${slug}`;

      return (
        <li key={id}>
          <Link to={articleSlug}>{t(name)}</Link>
        </li>
      );
    });

  /**
   * Displays articles with external links (<a href=""...)
   */
  const articlesList2 =
    articles &&
    articles.map(item => {
      const { id, name, slug } = item;
      const articleSlug = `${path2}/${articlesSlug}/${slug}`;

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
        <li key={shortid.generate()}>
          {t("Access articles through the archive")}:&nbsp;
          <Link to={`${path2}/${articlesSlug}`}>{articlesName}</Link>.
        </li>

        <li key={shortid.generate()}>
          <p>{t("Access articles directly")}:</p>
          <ul>{articlesList}</ul>
        </li>

        <li key={shortid.generate()}>
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
