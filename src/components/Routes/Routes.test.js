import React from "react";
import { render } from "@testing-library/react";
import Routes from "./Routes";

it("has a Routes component", () => {
  const { getByText } = render(<Routes />);
  expect(getByText("Routes")).toBeInTheDocument();
});
