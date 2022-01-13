export type MultipleSelectType = Readonly<{
  label: string;
  selectData: ReadonlyArray<string>;
  selectedValue: ReadonlyArray<string>;
  onSelectionChange: (selection: ReadonlyArray<string>) => void;
}>;

export type SelectedValuesRendererType = Readonly<{
  isAllSelected: boolean;
  selected: ReadonlyArray<string>;
}>;
