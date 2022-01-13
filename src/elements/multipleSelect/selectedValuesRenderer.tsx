import React from "react";
import { Box, Chip } from "@mui/material";
import { SelectedValuesRendererType } from "./types";

function SelectedValuesRenderer({
  selected,
  isAllSelected,
}: SelectedValuesRendererType) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {isAllSelected ? (
        <Chip label="All" />
      ) : (
        selected.map((value) => <Chip key={value} label={value} />)
      )}
    </Box>
  );
}

export default SelectedValuesRenderer;
