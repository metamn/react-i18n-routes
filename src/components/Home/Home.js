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
  const { name: articlesName, slug: articlesSlug, articles: items } = articles;
  const { t } = useTranslation("Home");

  /**
   * Articles with internal links
   */
  const articlesList =
    items &&
    items.map(item => {
      const { id, name, slug } = item;

      // NOTE: 1. Nested slugs has to be creted somewhere
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

      // NOTE: 1. Nested slugs has to be creted somewhere
      // NOTE: 3. Well setup slugs can be accessed externally without problem (sharing is possible)
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
      <ul>
        <li key="2">
          {t("Access articles through the archive")}:&nbsp;
          <Link to={`/${articlesSlug}`}>{t(articlesName)}</Link>.
        </li>

        <li key="1">
          <p>{t("Access articles directly")}:</p>
          <p>{articlesList}</p>
        </li>

        <li key="3">
          <p>{t("Open articles in antother tab")}:</p>
          <p>{articlesList2}</p>
        </li>
      </ul>
    </Layout>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes as HomePropTypes, defaultProps as HomeDefaultProps };
