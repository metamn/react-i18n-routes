import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

it("has a Home component", () => {
  const { getByText } = render(<Home />);
  expect(getByText("Home")).toBeInTheDocument();
});
