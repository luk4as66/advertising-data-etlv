import React, { useState } from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import _ from "lodash";
import { MultipleSelectType } from "./types";
import { allSelected } from "./utils";
import SelectedValuesRenderer from "./selectedValuesRenderer";
import ListItemRenderer from "./listItemRenderer";
import SelectAllRenderer from "./selectAllRenderer";

function MultipleSelect({
  label,
  selectData,
  selectedValue,
  onSelectionChange,
  testId,
}: MultipleSelectType): React.ReactElement {
  const [isAllSelected, setIsAllSelected] = useState<boolean>(
    allSelected(selectedValue, selectData)
  );

  const onRowClick = (rowText: string, isSelected: boolean): void => {
    let selection: ReadonlyArray<string>;
    if (isSelected) {
      selection = _.filter(selectedValue, (item) => item !== rowText);
    } else {
      selection = [...selectedValue, rowText];
    }
    onSelectionChange(selection);
  };

  const handleOnAllSelectChange = (isAll: boolean) => {
    if (isAll) {
      onSelectionChange(selectData);
    } else {
      onSelectionChange([]);
    }
    setIsAllSelected(isAll);
  };

  return (
    <div data-testid={testId}>
      <FormControl fullWidth sx={{ paddingTop: 1 }}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          multiple
          value={selectedValue}
          renderValue={(selected) => (
            <SelectedValuesRenderer
              isAllSelected={isAllSelected}
              selected={selected}
            />
          )}
        >
          <SelectAllRenderer
            isAllSelected={isAllSelected}
            onAllSelectChange={handleOnAllSelectChange}
          />
          <List
            height={200}
            itemCount={selectData.length}
            itemData={{
              onRowClick,
              items: selectData,
              selected: selectedValue,
            }}
            itemSize={40}
            width="100%"
          >
            {ListItemRenderer}
          </List>
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect;
