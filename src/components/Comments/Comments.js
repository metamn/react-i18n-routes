/**
 * Component short description
 *
 * @see Comments.md for details
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
import Comment from "../Comment";
import { getCurrentLang } from "../LanguageSelector";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Comments.data";

/**
 * Imports translations
 */
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Comments.lang.ro-ro";
import { hu_hu } from "./Comments.lang.hu-hu";
import { en_us } from "./Comments.lang.en-us";

i18n.addResourceBundle("ro-RO", "Comments", ro_ro);
i18n.addResourceBundle("hu-HU", "Comments", hu_hu);
i18n.addResourceBundle("en-US", "Comments", en_us);

/**
 * Displays the component
 */
const Comments = props => {
  const { items: defaultComments } = props;
  const { t, i18n } = useTranslation("Comments");

  /**
   * Loads comments from the server
   */
  const [comments, setComments] = useState(defaultComments);

  /**
   * Re-loads comments from server when the language is changed
   */
  const currentLang = getCurrentLang(i18n);

  useEffect(() => {
    fetch(`/api/comments/${currentLang}`)
      .then(response => response.json())
      .then(json => setComments(json.comments));
  }, [currentLang]);

  // NOTE: Resource containers create routes to children. Without usining the language file.
  const match = useRouteMatch();
  const { path } = match;

  const commentsList =
    comments &&
    comments.map(item => {
      const { id, name, slug } = item;
      const articleSlug = `${path}/${slug}`;

      return (
        <li key={id}>
          <Link to={articleSlug}>{t(name)}</Link>
        </li>
      );
    });

  return (
    <Switch>
      <Route path={`${path}/:slug`}>
        <Comment />
      </Route>
      <Route path={path}>
        <Layout>
          <ul>{commentsList}</ul>
        </Layout>
      </Route>
    </Switch>
  );
};

Comments.propTypes = propTypes;
Comments.defaultProps = defaultProps;

export default Comments;
export { propTypes as CommentsPropTypes, defaultProps as CommentsDefaultProps };
