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
import Comment from "../Comment";
import { getCurrentLang } from "../LanguageSelector";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Comments.data";

/**
 * Imports translations
 */
import i18n from "../../i18n";
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
  const { items: defaultComments, articleID, articleSlug } = props;
  const { t, i18n } = useTranslation("Comments");

  /**
   * Re-loads articles from server when the language is changed
   */
  const currentLang = getCurrentLang(i18n);

  /**
   * Loads comments from the server
   */
  const [comments, setComments] = useState(defaultComments);

  useEffect(() => {
    fetch(`/api/comments/${articleID}/${currentLang}`)
      .then(response => response.json())
      .then(json => setComments(json.comments));
  }, [articleID, currentLang]);

  // NOTE: Resource containers create routes to children. Without usining the language file.
  const match = useRouteMatch();
  const { path } = match;
  const path2 = path.replace(":slug", articleSlug);
  const commentsSlug = t("comments");

  const commentsList =
    comments &&
    comments.map(item => {
      const { id, name, slug } = item;
      const commentSlug = `${path2}/${commentsSlug}/${slug}`;

      return (
        <li key={id}>
          <Link to={commentSlug}>{t(name)}</Link>
        </li>
      );
    });

  return (
    <Switch>
      <Route path={`${path}/:slug`}>
        <Comment />
      </Route>
      <Route path={path}>
        <ul>{commentsList}</ul>
      </Route>
    </Switch>
  );
};

Comments.propTypes = propTypes;
Comments.defaultProps = defaultProps;

export default Comments;
export { propTypes as CommentsPropTypes, defaultProps as CommentsDefaultProps };
