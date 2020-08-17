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
import { useHistory, useLocation } from "react-router-dom";

/**
 * Imports other components and hooks
 */
import { routesUpdateURL, routesGetCurrentLang } from "../Routes";

/**
 * Imports data
 */
import { propTypes, defaultProps } from "./LanguageSelector.data";

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
   * Saves breadcrumbs / location
   * On language change the URL will be updated by translating these breadcrumbs
   */
  //const location = useLocation();

  /**
   * Manages the state of the select box
   */
  const currentLanguage = routesGetCurrentLang(i18n);
  const [selected, setSelected] = useState(currentLanguage);

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

    if (selected !== currentLanguage) {
      console.log("URL must be updated");
      //console.log("location:", location);
    }
    //history.push(routesUpdateURL({ i18n: i18n }));
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
  defaultProps as LanguageSelectorDefaultProps
};
