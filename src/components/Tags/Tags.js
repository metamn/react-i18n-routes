/**
 * Component short description
 *
 * @see Tags.md for details
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
import { propTypes, defaultProps } from "./Tags.data";

/**
 * Imports Material UI components
 */
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

/**
 * Imports translations
 */
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Tags.lang.ro-ro";
import { hu_hu } from "./Tags.lang.hu-hu";
import { en_us } from "./Tags.lang.en-us";
import { de_de } from "./Tags.lang.de-de";

i18n.addResourceBundle("ro-RO", "Tags", ro_ro);
i18n.addResourceBundle("hu-HU", "Tags", hu_hu);
i18n.addResourceBundle("en-US", "Tags", en_us);
i18n.addResourceBundle("de-DE", "Tags", de_de);

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
const Tags = props => {
  const { container } = useStyles(props);
  const { t } = useTranslation("Tags");

  return (
    <Grid container>
      <Grid item xs={12} className={clsx(container, "Tags")}>
        {t("Tags")}
      </Grid>
    </Grid>
  );
};

Tags.propTypes = propTypes;
Tags.defaultProps = defaultProps;

export default Tags;
export { propTypes as TagsPropTypes, defaultProps as TagsDefaultProps };
