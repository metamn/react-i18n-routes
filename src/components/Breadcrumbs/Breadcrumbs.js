/**
 * Displays breadrcumbs using the router
 *
 * @see Breadcrumbs.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import clsx from "clsx";
import shortid from "shortid";
import { Link as RouterLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { startCase, kebabCase } from "lodash";

/**
 * Imports other components and hooks
 */
import { isCurrentLangTheDefaultLang } from "../LanguageSelector";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./Breadcrumbs.data";

/**
 * Imports Material UI components
 */
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { emphasize, withStyles } from "@material-ui/core/styles";
import { Breadcrumbs as MUIBreadcrumbs } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./Breadcrumbs.lang.ro-ro";
import { en_us } from "./Breadcrumbs.lang.en-us";

i18n.addResourceBundle("ro-RO", "Breadcrumbs", ro_ro);
i18n.addResourceBundle("en-US", "Breadcrumbs", en_us);

/**
 * Styles the component
 */
const useStyles = makeStyles(theme => ({
  container: {}
}));

/**
 * Displays breadcrumbs as chips
 */
const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,

    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[500],
      cursor: "pointer",
      color: "white"
    },

    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[500], 0.12),
      cursor: "pointer",
      color: "white"
    }
  }
}))(Chip);

/**
 * Displays the component
 */
const Breadcrumbs = props => {
  const { container } = useStyles(props);
  const { t: tHome } = useTranslation("Home");

  /**
   * Integrates with the router
   */
  const breadcrumbs = useBreadcrumbs();

  /**
   * Displays less on small screens
   */
  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("md"));
  const maxItems = isPortrait ? 2 : 8;

  /**
   * Prepares the items
   */
  const links = breadcrumbs.map(({ breadcrumb }, index) => {
    const { key } = breadcrumb;

    /**
     * Get breadcrumb name
     */
    const { props } = breadcrumb;
    const { children } = props;

    /**
     * Only `Home` must be translated
     */
    const translatedLabel =
      children === "Home" ? tHome(children, children) : children;

    const translatedSlug =
      children === "Home" ? tHome(kebabCase(children), key) : key;

    /**
     * Language codes have to be removed from the Breadcrumbs
     * Ex.: Home (Ro) > Ro > Articles Ro => Home (Ro) > Articles Ro
     */
    if (index === 1 && !isCurrentLangTheDefaultLang(i18n)) return null;

    /**
     * Labels have to be decamelized
     * Ex: 'Article-1' > 'Article 1'
     */
    const translatedLabelDecamelized = startCase(translatedLabel);

    return (
      <StyledBreadcrumb
        label={translatedLabelDecamelized}
        to={translatedSlug}
        component={RouterLink}
        key={shortid.generate()}
      />
    );
  });

  return (
    <MUIBreadcrumbs
      maxItems={maxItems}
      className={clsx(container, "Breadcrumbs")}
    >
      {links}
    </MUIBreadcrumbs>
  );
};

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default Breadcrumbs;
export {
  propTypes as BreadcrumbsPropTypes,
  defaultProps as BreadcrumbsDefaultProps
};
