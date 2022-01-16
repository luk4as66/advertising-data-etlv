import React from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import _ from "lodash";
import { ListItemRendererType } from "./types";

function ListItemRenderer({ data, index, style }: ListItemRendererType) {
  const isSelected = _.includes(data.selected, data.items[index]);

  return (
    <ListItem key={index} style={style} disablePadding>
      <ListItemButton selected={isSelected}>
        <ListItemText
          onClick={() => data.onRowClick(data.items[index], isSelected)}
          style={{ width: 200 }}
          primary={data.items[index]}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default React.memo(ListItemRenderer);
