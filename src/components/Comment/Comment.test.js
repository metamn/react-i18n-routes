import React from "react";
import { render } from "@testing-library/react";
import Comment from "./Comment";

it("has a Comment component", () => {
  const { getByText } = render(<Comment />);
  expect(getByText("Comment")).toBeInTheDocument();
});
