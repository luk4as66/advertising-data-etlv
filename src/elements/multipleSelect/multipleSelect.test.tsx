import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import MultipleSelect from "./multipleSelect";

const selectData = ["One", "Two", "Tree"];
const selectedValue = ["One"];
const onSelectionChangeMock = jest.fn();

describe("MultipleSelect", () => {
  afterEach(() => {
    onSelectionChangeMock.mockClear();
  });

  test("should render correctly when dropdown clicked", async () => {
    render(
      <MultipleSelect
        onSelectionChange={onSelectionChangeMock}
        selectData={selectData}
        label="Multiple Select"
        selectedValue={selectedValue}
      />
    );
    const label = screen.getByText("Multiple Select");
    expect(label).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole("button"));
    await screen.getByRole("listbox");

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  test("should call onSelectionChange when selection change", async () => {
    render(
      <MultipleSelect
        onSelectionChange={onSelectionChangeMock}
        selectData={selectData}
        label="Multiple Select"
        selectedValue={selectedValue}
      />
    );
    fireEvent.mouseDown(screen.getByRole("button"));
    await screen.getByRole("listbox");
    fireEvent.click(screen.getByText("Two"));

    expect(onSelectionChangeMock).toBeCalledWith(["One", "Two"]);
  });

  test("should call onSelectionChange with selectData when all clicked", async () => {
    render(
      <MultipleSelect
        onSelectionChange={onSelectionChangeMock}
        selectData={selectData}
        label="Multiple Select"
        selectedValue={selectedValue}
      />
    );
    fireEvent.mouseDown(screen.getByRole("button"));
    await screen.getByRole("listbox");
    fireEvent.click(screen.getByText("All"));

    expect(onSelectionChangeMock).toBeCalledWith(selectData);
  });

  test("should show Clear selection on dropdown when All selected", async () => {
    render(
      <MultipleSelect
        onSelectionChange={onSelectionChangeMock}
        selectData={selectData}
        label="Multiple Select"
        selectedValue={selectData}
      />
    );
    fireEvent.mouseDown(screen.getByRole("button"));
    await screen.getByRole("listbox");

    expect(screen.getByText("Clear selection")).toBeInTheDocument();
  });

  test("should clear all selected", async () => {
    render(
      <MultipleSelect
        onSelectionChange={onSelectionChangeMock}
        selectData={selectData}
        label="Multiple Select"
        selectedValue={selectData}
      />
    );
    fireEvent.mouseDown(screen.getByRole("button"));
    await screen.getByRole("listbox");
    fireEvent.click(screen.getByText("Clear selection"));

    expect(onSelectionChangeMock).toBeCalledWith([]);
  });
  test("should deselect", async () => {
    render(
      <MultipleSelect
        onSelectionChange={onSelectionChangeMock}
        selectData={selectData}
        label="Multiple Select"
        selectedValue={selectedValue}
      />
    );
    fireEvent.mouseDown(screen.getByRole("button"));
    await screen.getByRole("listbox");
    const dropdown = within(screen.getByRole("listbox"));
    fireEvent.click(dropdown.getByText("One"));

    expect(onSelectionChangeMock).toBeCalledWith([]);
  });

  test("should show more", async () => {
    const moreSelected = selectData.concat(["Four", "Five", "Six"]);
    render(
      <MultipleSelect
        onSelectionChange={onSelectionChangeMock}
        selectData={selectData}
        label="Multiple Select"
        selectedValue={moreSelected}
      />
    );

    expect(screen.getByText("and 1 more")).toBeInTheDocument();
  });
});
