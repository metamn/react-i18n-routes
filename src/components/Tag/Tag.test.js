import React from "react";
import { render } from "@testing-library/react";
import Tag from "./Tag";

it("has a Tag component", () => {
  const { getByText } = render(<Tag />);
  expect(getByText("Tag")).toBeInTheDocument();
});
