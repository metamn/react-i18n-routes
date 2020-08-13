/**
 * Component short description
 *
 * @see Tag.md for details
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
import { propTypes, defaultProps } from "./Tag.data";

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
import { ro_ro } from "./Tag.lang.ro-ro";
import { hu_hu } from "./Tag.lang.hu-hu";
import { en_us } from "./Tag.lang.en-us";
import { de_de } from "./Tag.lang.de-de";

i18n.addResourceBundle("ro-RO", "Tag", ro_ro);
i18n.addResourceBundle("hu-HU", "Tag", hu_hu);
i18n.addResourceBundle("en-US", "Tag", en_us);
i18n.addResourceBundle("de-DE", "Tag", de_de);

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
const Tag = props => {
  const { container } = useStyles(props);
  const { t } = useTranslation("Tag");

  return (
    <Grid container>
      <Grid item xs={12} className={clsx(container, "Tag")}>
        {t("Tag")}
      </Grid>
    </Grid>
  );
};

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
export { propTypes as TagPropTypes, defaultProps as TagDefaultProps };
