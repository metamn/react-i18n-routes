import React from "react";
import { render } from "@testing-library/react";
import LanguageSelector from "./LanguageSelector";

it("has a LanguageSelector component", () => {
  const { getByText } = render(<LanguageSelector />);
  expect(getByText("LanguageSelector")).toBeInTheDocument();
});
