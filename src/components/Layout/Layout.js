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
  const { children } = props;
  const { container } = useStyles(props);

  return (
    <Grid container spacing={2} className={clsx(container, "Layout")}>
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
