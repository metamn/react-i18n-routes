import React from "react";
import { render } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";

it("has a Breadcrumbs component", () => {
  const { getByText } = render(<Breadcrumbs />);
  expect(getByText("Breadcrumbs")).toBeInTheDocument();
});
