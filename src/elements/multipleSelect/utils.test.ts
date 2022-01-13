import { allSelected, clearSelected } from "./utils";

describe("allSelected", () => {
  const mockSelectData = ["One", "Two", "Tree", "Four"];

  test("should return true when arrays have same length", () => {
    const mockValue = ["One", "Two", "Tree", "Four"];
    const isAllSelected = allSelected(mockValue, mockSelectData);
    expect(isAllSelected).toEqual(true);
  });

  test("should return true when selection contains all", () => {
    const mockValueWithAll = ["One", "Two", "all", "Four"];
    const isAllSelected = allSelected(mockValueWithAll, mockSelectData);
    expect(isAllSelected).toEqual(true);
  });

  test("should return true when selection contains ONLY all", () => {
    const mockValueWithAll = ["all"];
    const isAllSelected = allSelected(mockValueWithAll, mockSelectData);
    expect(isAllSelected).toEqual(true);
  });

  test("should return false when selection not contains all and arrays are not same length", () => {
    const mockValue = ["One"];
    const isAllSelected = allSelected(mockValue, mockSelectData);
    expect(isAllSelected).toEqual(false);
  });
});

describe("clearSelected", () => {
  test("should return true when selection contains clear", () => {
    const mockValue = ["One", "clear"];
    const isClearSelected = clearSelected(mockValue);
    expect(isClearSelected).toEqual(true);
  });

  test("should return true when selection NOT contains clear", () => {
    const mockValue = ["One"];
    const isClearSelected = clearSelected(mockValue);
    expect(isClearSelected).toEqual(false);
  });
});
