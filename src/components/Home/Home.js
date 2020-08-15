/**
 * Component short description
 *
 * @see Home.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

/**
 * Imports other components and hooks
 */
import Layout from "../Layout";
import Article from "../Article";
import { routesGenerateSlug } from "../Routes";

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
import { hu_hu } from "./Home.lang.hu-hu";
import { en_us } from "./Home.lang.en-us";
import { de_de } from "./Home.lang.de-de";

i18n.addResourceBundle("ro-RO", "Home", ro_ro);
i18n.addResourceBundle("hu-HU", "Home", hu_hu);
i18n.addResourceBundle("en-US", "Home", en_us);
i18n.addResourceBundle("de-DE", "Home", de_de);

/**
 * Displays the component
 */
const Home = props => {
  const { articles } = props;
  const { articles: items } = articles;
  const { t } = useTranslation("Home");
  const { t: tArticles } = useTranslation("Articles");

  // NOTE: 7. Resource containers should provide their localized name, slug to other components
  // NOTE: 7a. They do via t(). We don't need anything else here
  const articlesName = tArticles("Articles");
  const articlesSlug = routesGenerateSlug({ name: "Articles" });

  /**
   * Articles with internal links
   */
  const articlesList =
    items &&
    items.map(item => {
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
    items &&
    items.map(item => {
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
