/**
 * Component short description
 *
 * @see Comment.md for details
 */

/**
 * Imports React and third party packages
 */
import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

/**
 * Imports other components and hooks
 */

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Comment.data";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Comment.lang.ro-ro";
import { hu_hu } from "./Comment.lang.hu-hu";
import { en_us } from "./Comment.lang.en-us";

i18n.addResourceBundle("ro-RO", "Comment", ro_ro);
i18n.addResourceBundle("hu-HU", "Comment", hu_hu);
i18n.addResourceBundle("en-US", "Comment", en_us);

/**
 * Displays the component
 */
const Comment = props => {
  const { slug: defaultSlug } = props;
  const { t } = useTranslation("Comment");

  // NOTE: Resources parse the URL to get their unique slug id
  const {
    params: { slug: slugFromURL }
  } = useRouteMatch();

  const slugForQuery = slugFromURL ? slugFromURL : defaultSlug;

  console.log("slugForQuery:", slugForQuery);

  // NOTE: Resources query the DB and load their own data
  const [comment, setcomment] = useState(props);

  useEffect(() => {
    fetch(`/api/comment/${slugForQuery}`)
      .then(response => response.json())
      .then(json => setcomment(json.comment));
  }, [slugForQuery]);

  /**
   * Parses the received data
   */
  const { name, slug } = comment;

  return (
    <dl>
      <dt>{t("Name")}:</dt>
      <dd>{name}</dd>
      <dt>{t("Slug")}:</dt>
      <dd>{slug}</dd>
    </dl>
  );
};

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

export default Comment;
export { propTypes as CommentPropTypes, defaultProps as CommentDefaultProps };
