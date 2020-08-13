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
  const { t } = useTranslation("Home");

  const slug = t("articles");
  const name = t("Articles");

  return (
    <Layout>
      <Link to={`/${slug}`}>{name}</Link>
    </Layout>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
export { propTypes as HomePropTypes, defaultProps as HomeDefaultProps };
