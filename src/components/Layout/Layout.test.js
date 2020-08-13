import React from "react";
import { render } from "@testing-library/react";
import Layout from "./Layout";

it("has a Layout component", () => {
  const { getByText } = render(<Layout />);
  expect(getByText("Layout")).toBeInTheDocument();
});
