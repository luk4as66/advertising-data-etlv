import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { MultipleSelectType } from "./types";
import { allSelected, clearSelected } from "./utils";
import SelectedValuesRenderer from "./selectedValuesRenderer";

function MultipleSelect({
  label,
  selectData,
  selectedValue,
  onSelectionChange,
}: MultipleSelectType): React.ReactElement {
  const [isAllSelected, setIsAllSelected] = useState<boolean>(
    allSelected(selectedValue, selectData)
  );

  const handleSelectChange = (
    evt: SelectChangeEvent<ReadonlyArray<string>>
  ): void => {
    const {
      target: { value },
    } = evt;

    const selectionArray: ReadonlyArray<string> =
      typeof value === "string" ? value.split(",") : value;

    if (allSelected(selectionArray, selectData)) {
      onSelectionChange(selectData);
      setIsAllSelected(true);
    } else if (clearSelected(selectionArray)) {
      onSelectionChange([]);
      setIsAllSelected(false);
    } else {
      onSelectionChange(selectionArray);
      setIsAllSelected(false);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        multiple
        onChange={handleSelectChange}
        value={selectedValue}
        renderValue={(selected) => (
          <SelectedValuesRenderer
            isAllSelected={isAllSelected}
            selected={selected}
          />
        )}
      >
        {isAllSelected ? (
          <MenuItem key="clear" value="clear">
            Clear selection
          </MenuItem>
        ) : (
          <MenuItem key="all" value="all">
            All
          </MenuItem>
        )}
        {selectData.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MultipleSelect;
