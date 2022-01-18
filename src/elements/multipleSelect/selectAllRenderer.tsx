import React from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SelectAllRendererType } from "./types";

function SelectAllRenderer({
  isAllSelected,
  onAllSelectChange,
}: SelectAllRendererType) {
  return (
    <>
      {!isAllSelected && (
        <ListItem key="all" disablePadding>
          <ListItemButton>
            <ListItemText
              onClick={() => onAllSelectChange(true)}
              style={{ width: 200 }}
              primary="All"
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItemButton>
        </ListItem>
      )}
      <ListItem key="clear" disablePadding>
        <ListItemButton>
          <ListItemText
            onClick={() => onAllSelectChange(false)}
            style={{ width: 200 }}
            primary="Clear selection"
            primaryTypographyProps={{ noWrap: true }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default React.memo(SelectAllRenderer);
