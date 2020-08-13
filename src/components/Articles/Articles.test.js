import React from "react";
import { render } from "@testing-library/react";
import Articles from "./Articles";

it("has a Articles component", () => {
  const { getByText } = render(<Articles />);
  expect(getByText("Articles")).toBeInTheDocument();
});
