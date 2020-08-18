/**
 * Component short description
 *
 * @see LanguageSelector.md for details
 */

/**
 * Imports React and third party packages
 */
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import shortid from "shortid";
import { upperCase } from "lodash";
import { useHistory } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

/**
 * Imports other components and hooks
 */
import { routesUpdateURL } from "../Routes";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./LanguageSelector.data";

/**
 * Imports logic
 */
import {
  getCurrentLang,
  getDefaultLang,
  isCurrentLangTheDefaultLang,
  getLanguageFromURL,
  getURLPrefix
} from "./LanguageSelector.logic";

/**
 * Imports Material UI components
 */
import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

/**
 * Imports translations
 */
import i18n from "../../i18n";

/**
 * Styles the component
 */
const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(2)
  },

  textField: {
    /**
     * Remove the underline
     */
    "& .MuiInput-underline::before": {
      borderBottom: "none"
    }
  }
}));

/**
 * Displays the component
 */
const LanguageSelector = props => {
  const { languages } = props;
  const { container, textField } = useStyles(props);
  const history = useHistory();

  /**
   * Loads breadcrumbs:
   * 1. The default language will be determined from URL / breadcrumbs
   * 2. On language change the URL will be updated by translating these breadcrumbs
   * 2.a useLocation is not enough for translations
   */
  const breadcrumbs = useBreadcrumbs();

  /**
   * Loads the default language from i18n
   */
  const currentLanguage = getCurrentLang(i18n);

  /**
   * Loads language from URL
   */
  const languageFromURL = getLanguageFromURL({
    breadcrumbs: breadcrumbs,
    currentLanguage: currentLanguage,
    languages: languages
  });

  /**
   * Decides if the URL needs translation
   */
  const urlNeedsTranslation = currentLanguage === languageFromURL;

  /**
   * Manages the state of the select box
   */
  const [selected, setSelected] = useState(languageFromURL);

  /**
   * Manages the select box change
   */
  const selectHandler = event => {
    setSelected(event.target.value);
  };

  /**
   * Sets the new language
   *
   * Also updates the URL. Otherwise we'll get mixed languages un the UI.
   */
  useEffect(() => {
    i18n.changeLanguage(selected);

    if (selected !== currentLanguage && urlNeedsTranslation) {
      const newURL = routesUpdateURL({ breadcrumbs: breadcrumbs, i18n: i18n });
      history.push(newURL);
    }
  }, [selected]);

  /**
   * Prepares the select box items
   */
  const items = languages.map(item => {
    const { displayName, alternateName } = item;

    return (
      <MenuItem key={shortid.generate()} value={alternateName}>
        <Typography variant="body2">{upperCase(displayName)}</Typography>
      </MenuItem>
    );
  });

  return (
    <FormControl className={clsx(container, "LanguageSelector")}>
      <TextField
        name="language"
        className={clsx(textField, "TextField")}
        select
        variant="outlined"
        value={selected}
        onChange={selectHandler}
      >
        {items}
      </TextField>
    </FormControl>
  );
};

LanguageSelector.propTypes = propTypes;
LanguageSelector.defaultProps = defaultProps;

export default LanguageSelector;
export {
  propTypes as LanguageSelectorPropTypes,
  defaultProps as LanguageSelectorDefaultProps,
  getCurrentLang,
  getDefaultLang,
  isCurrentLangTheDefaultLang,
  getURLPrefix
};
