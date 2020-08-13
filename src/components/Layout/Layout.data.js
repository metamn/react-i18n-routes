/**
 * Defines the data requirements for the component
 *
 * @see Layout.md for details
 */
import PropTypes from "prop-types";

/**
 * Imports prop types from other components
 */
import {
  LanguageSelectorPropTypes,
  LanguageSelectorDefaultProps
} from "../LanguageSelector";

/**
 * Defines the prop types
 */
const propTypes = {
  languageSelector: PropTypes.shape(LanguageSelectorPropTypes),
  children: PropTypes.any
};

/**
 * Defines the default props
 */
const defaultProps = {
  languageSelector: LanguageSelectorDefaultProps,
  children: null
};

export { propTypes, defaultProps };
