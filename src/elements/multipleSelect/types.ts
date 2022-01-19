import React from "react";

export type MultipleSelectType = Readonly<{
  label: string;
  selectData: ReadonlyArray<string>;
  selectedValue: ReadonlyArray<string>;
  onSelectionChange: (selection: ReadonlyArray<string>) => void;
  testId?: string;
}>;

export type SelectedValuesRendererType = Readonly<{
  isAllSelected: boolean;
  selected: ReadonlyArray<string>;
}>;

export type ListItemRendererType = Readonly<{
  index: number;
  style: React.CSSProperties | undefined;
  data: {
    onRowClick: (value: string, isSelected: boolean) => void;
    items: ReadonlyArray<string>;
    selected: ReadonlyArray<string>;
  };
}>;

export type SelectAllRendererType = Readonly<{
  isAllSelected: boolean;
  onAllSelectChange: (isAllSelected: boolean) => void;
}>;
