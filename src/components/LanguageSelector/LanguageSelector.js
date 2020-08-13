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

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./LanguageSelector.data";

/**
 * Imports Material UI components
 */
import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

/**
 * Imports translations
 */
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { ro_ro } from "./LanguageSelector.lang.ro-ro";
import { hu_hu } from "./LanguageSelector.lang.hu-hu";
import { en_us } from "./LanguageSelector.lang.en-us";
import { de_de } from "./LanguageSelector.lang.de-de";

i18n.addResourceBundle("ro-RO", "LanguageSelector", ro_ro);
i18n.addResourceBundle("hu-HU", "LanguageSelector", hu_hu);
i18n.addResourceBundle("en-US", "LanguageSelector", en_us);
i18n.addResourceBundle("de-DE", "LanguageSelector", de_de);

/**
 * Styles the component
 */
const useStyles = makeStyles(theme => ({
  container: {},

  textField: {
    /**
     * Remove the underline
     */
    "& .MuiInput-underline::before": {
      borderBottom: "none"
    },

    /**
     * Aligning the dropdown icon
     */
    ["& .MuiSelect-icon"]: {
      top: "auto"
    }
  }
}));

/**
 * Displays the component
 */
const LanguageSelector = props => {
  const { languages, defaultLanguage } = props;
  const { alternateName } = defaultLanguage;

  const { container, textField } = useStyles(props);
  const { t } = useTranslation("LanguageSelector");

  const currentLanguage = i18n.language || alternateName;

  /**
   * Manages the state of the select box
   */
  const [selected, setSelected] = useState(currentLanguage);

  /**
   * Manages the select box change
   */
  const selectHandler = event => {
    setSelected(event.target.value);
  };

  /**
   * Sets the new language
   */
  useEffect(() => {
    i18n.changeLanguage(selected);
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
  defaultProps as LanguageSelectorDefaultProps
};
