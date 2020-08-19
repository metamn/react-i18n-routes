/**
 * Defines the data requirements for the component
 *
 * @see LanguageSelector.md for details
 */
import PropTypes from "prop-types";

/**
 * Defines the prop types
 *
 * @see https://schema.org/Language
 */
const LanguagePropTypes = {
  name: PropTypes.string,
  alternateName: PropTypes.string,
  displayName: PropTypes.string
};

const propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape(LanguagePropTypes)),
  defaultLanguage: PropTypes.shape(LanguagePropTypes)
};

/**
 * Defines the default props
 */
const defaultProps = {
  languages: [
    {
      name: "English",
      alternateName: "en-US",
      displayName: "En"
    },
    {
      name: "Romanian",
      alternateName: "ro-RO",
      displayName: "Ro"
    }
  ]
};

export { propTypes, defaultProps };
