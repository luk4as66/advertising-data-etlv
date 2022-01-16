import React from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SelectAllRendererType } from "./types";

function SelectAllRenderer({
  isAllSelected,
  onAllSelectChange,
}: SelectAllRendererType) {
  return (
    <ListItem key="all-clear" disablePadding>
      <ListItemButton>
        <ListItemText
          onClick={() => onAllSelectChange(!isAllSelected)}
          style={{ width: 200 }}
          primary={isAllSelected ? "Clear selection" : "All"}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default React.memo(SelectAllRenderer);
