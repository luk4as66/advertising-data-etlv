import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MultipleSelect from "./multipleSelect";

const selectData = ["One", "Two", "Tree"];
const selectedValue = ["One"];
const onSelectionChangeMock = jest.fn();

describe("MultipleSelect", () => {
  beforeEach(() => {
    render(
      <MultipleSelect
        onSelectionChange={onSelectionChangeMock}
        selectData={selectData}
        label="Multiple Select"
        selectedValue={selectedValue}
      />
    );
  });

  afterEach(() => {
    onSelectionChangeMock.mockClear();
  });

  test("should render correctly when dropdown clicked", async () => {
    const label = screen.getByText("Multiple Select");
    expect(label).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole("button"));
    await screen.getByRole("listbox");

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  test("should call onSelectionChange when selection change", async () => {
    fireEvent.mouseDown(screen.getByRole("button"));
    await screen.getByRole("listbox");
    fireEvent.click(screen.getByText("Two"));

    expect(onSelectionChangeMock).toBeCalledWith(["One", "Two"]);
  });

  test("should call onSelectionChange with selectData when all clicked", async () => {
    fireEvent.mouseDown(screen.getByRole("button"));
    await screen.getByRole("listbox");
    fireEvent.click(screen.getByText("All"));

    expect(onSelectionChangeMock).toBeCalledWith(selectData);
  });
});
