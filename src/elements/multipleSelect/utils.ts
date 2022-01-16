import _ from "lodash";

export const allSelected = (
  value: ReadonlyArray<string>,
  selectData: ReadonlyArray<string>
): boolean => {
  if (selectData.length > 0 && selectData.length === value.length) {
    return true;
  }
  return Boolean(_.find(value, (item) => item === "all"));
};

export const clearSelected = (value: ReadonlyArray<string>): boolean =>
  Boolean(_.find(value, (item) => item === "clear"));
