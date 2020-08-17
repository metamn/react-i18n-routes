import React from "react";

import Routes, { RoutesDefaultProps } from "./components/Routes";
// NOTE: Language selector should stay outside the layout. Otherwise on every click it will be re-rendered, thus re-initialized, thus the URL updated
import LanguageSelector from "./components/LanguageSelector";

const App = () => {
  return (
    <>
      <LanguageSelector />
      <Routes {...RoutesDefaultProps} />
    </>
  );
};

export default App;
