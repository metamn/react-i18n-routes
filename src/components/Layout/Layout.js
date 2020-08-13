/**
 * Component short description
 *
 * @see Layout.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import clsx from "clsx";

/**
 * Imports other components and hooks
 */
import LanguageSelector from "../LanguageSelector";
import Breadcrumbs from "../Breadcrumbs";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Layout.data";

/**
 * Imports Material UI components
 */
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Layout.lang.ro-ro";
import { hu_hu } from "./Layout.lang.hu-hu";
import { en_us } from "./Layout.lang.en-us";
import { de_de } from "./Layout.lang.de-de";

i18n.addResourceBundle("ro-RO", "Layout", ro_ro);
i18n.addResourceBundle("hu-HU", "Layout", hu_hu);
i18n.addResourceBundle("en-US", "Layout", en_us);
i18n.addResourceBundle("de-DE", "Layout", de_de);

/**
 * Styles the component
 */
const useStyles = makeStyles(theme => ({
  container: {}
}));

/**
 * Displays the component
 */
const Layout = props => {
  const { languageSelector, children } = props;
  const { container } = useStyles(props);
  const { t } = useTranslation("Layout");

  return (
    <Grid container className={clsx(container, "Layout")}>
      <Grid item xs={12}>
        <LanguageSelector {...languageSelector} />
      </Grid>
      <Grid item xs={12}>
        <Breadcrumbs />
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
export { propTypes as LayoutPropTypes, defaultProps as LayoutDefaultProps };
