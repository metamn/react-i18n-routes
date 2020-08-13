import React from "react";
import { render } from "@testing-library/react";
import Article from "./Article";

it("has a Article component", () => {
  const { getByText } = render(<Article />);
  expect(getByText("Article")).toBeInTheDocument();
});
