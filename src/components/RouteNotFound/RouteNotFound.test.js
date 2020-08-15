import React from "react";
import { render } from "@testing-library/react";
import RouteNotFound from "./RouteNotFound";

it("has a RouteNotFound component", () => {
  const { getByText } = render(<RouteNotFound />);
  expect(getByText("RouteNotFound")).toBeInTheDocument();
});
