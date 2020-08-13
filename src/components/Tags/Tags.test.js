import React from "react";
import { render } from "@testing-library/react";
import Tags from "./Tags";

it("has a Tags component", () => {
  const { getByText } = render(<Tags />);
  expect(getByText("Tags")).toBeInTheDocument();
});
