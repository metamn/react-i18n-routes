/**
 * Component short description
 *
 * @see RouteNotFound.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Imports other components and hooks
 *
 * // NOTE: 10. The 404 page has to be kept simple. When wrapped into `<Layout>` sometimes it gets into an infinite loop due to the state in `<LanguageSelector>`
 */

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./RouteNotFound.data";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./RouteNotFound.lang.ro-ro";
import { en_us } from "./RouteNotFound.lang.en-us";

i18n.addResourceBundle("ro-RO", "RouteNotFound", ro_ro);
i18n.addResourceBundle("en-US", "RouteNotFound", en_us);

/**
 * Displays the component
 */
const RouteNotFound = props => {
  const { t } = useTranslation("RouteNotFound");

  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {t("Not found")}: {pathname}
    </>
  );
};

RouteNotFound.propTypes = propTypes;
RouteNotFound.defaultProps = defaultProps;

export default RouteNotFound;
export {
  propTypes as RouteNotFoundPropTypes,
  defaultProps as RouteNotFoundDefaultProps
};
