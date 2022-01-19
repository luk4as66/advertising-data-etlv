import React from "react";
import { render, screen } from "@testing-library/react";
import Graph from "./graph";

describe("Graph", () => {
  test("should render correctly ", async () => {
    render(<Graph data={[]} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
