/**
 * Component short description
 *
 * @see RouteNotFound.md for details
 */

/**
 * Imports React and third party packages
 */
import React from "react";

/**
 * Imports other components and hooks
 */
import Layout from "../Layout";

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
import { hu_hu } from "./RouteNotFound.lang.hu-hu";
import { en_us } from "./RouteNotFound.lang.en-us";
import { de_de } from "./RouteNotFound.lang.de-de";

i18n.addResourceBundle("ro-RO", "RouteNotFound", ro_ro);
i18n.addResourceBundle("hu-HU", "RouteNotFound", hu_hu);
i18n.addResourceBundle("en-US", "RouteNotFound", en_us);
i18n.addResourceBundle("de-DE", "RouteNotFound", de_de);

/**
 * Displays the component
 */
const RouteNotFound = props => {
  const { t } = useTranslation("RouteNotFound");

  return <Layout>{t("404")}</Layout>;
};

RouteNotFound.propTypes = propTypes;
RouteNotFound.defaultProps = defaultProps;

export default RouteNotFound;
export {
  propTypes as RouteNotFoundPropTypes,
  defaultProps as RouteNotFoundDefaultProps
};
