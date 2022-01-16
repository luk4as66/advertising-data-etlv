export const allSelected = (
  value: ReadonlyArray<string>,
  selectData: ReadonlyArray<string>
): boolean => selectData.length > 0 && selectData.length === value.length;
