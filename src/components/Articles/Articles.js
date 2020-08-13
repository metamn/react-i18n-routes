/**
 * Component short description
 *
 * @see Articles.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import clsx from "clsx";

/**
 * Imports other components and hooks
 */

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Articles.data";

/**
 * Imports Material UI components
 */
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

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
 * Styles the component
 */
const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    border: "1px solid"
  }
}));

/**
 * Displays the component
 */
const Articles = props => {
  const { container } = useStyles(props);
  const { t } = useTranslation("Articles");

  return (
    <Grid container>
      <Grid item xs={12} className={clsx(container, "Articles")}>
        {t("Articles")}
      </Grid>
    </Grid>
  );
};

Articles.propTypes = propTypes;
Articles.defaultProps = defaultProps;

export default Articles;
export { propTypes as ArticlesPropTypes, defaultProps as ArticlesDefaultProps };
