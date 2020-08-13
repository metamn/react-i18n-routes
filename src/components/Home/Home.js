/**
 * Component short description
 *
 * @see Home.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import { Link } from "react-router-dom";

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
  const { t } = useTranslation("Home");

  const slug = t("articles");
  const name = t("Archives");

  const articlesList =
    articles &&
    articles.map(item => {
      const { id, name, slug } = item;

      return (
        <li key={id}>
          <Link to={slug}>{t(name)}</Link>
        </li>
      );
    });

  return (
    <Layout>
      <p>{t("Access articles directly")}:</p>
      <p>{articlesList}</p>
      <p>
        {t("Access articles through the")} <Link to={`/${slug}`}>{name}</Link>.
      </p>
    </Layout>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes as HomePropTypes, defaultProps as HomeDefaultProps };
