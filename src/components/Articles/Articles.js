/**
 * Component short description
 *
 * @see Articles.md for details
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
import { propTypes, defaultProps } from "./Articles.data";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Articles.lang.ro-ro";
import { hu_hu } from "./Articles.lang.hu-hu";
import { en_us } from "./Articles.lang.en-us";
import { de_de } from "./Articles.lang.de-de";

i18n.addResourceBundle("ro-RO", "Articles", ro_ro);
i18n.addResourceBundle("hu-HU", "Articles", hu_hu);
i18n.addResourceBundle("en-US", "Articles", en_us);
i18n.addResourceBundle("de-DE", "Articles", de_de);

/**
 * Displays the component
 */
const Articles = props => {
  const { articles } = props;
  const { t } = useTranslation("Home");

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

  // NOTE: 2. A new route has to be added to child
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
