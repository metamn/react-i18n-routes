import React from "react";
import { render } from "@testing-library/react";
import Comments from "./Comments";

it("has a Comments component", () => {
  const { getByText } = render(<Comments />);
  expect(getByText("Comments")).toBeInTheDocument();
});
