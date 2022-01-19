import React from "react";
import { Box, Chip } from "@mui/material";
import { SelectedValuesRendererType } from "./types";

function SelectedValuesRenderer({
  selected,
  isAllSelected,
  chipLimit,
}: SelectedValuesRendererType) {
  const limit = chipLimit || 5;
  const firstSelected = selected.slice(0, limit);
  const moreLabel = `and ${selected.length - limit} more`;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {isAllSelected ? (
        <Chip label="All" />
      ) : (
        firstSelected.map((value) => <Chip key={value} label={value} />)
      )}
      {selected.length > limit && !isAllSelected && (
        <Chip key="more" label={moreLabel} />
      )}
    </Box>
  );
}

export default SelectedValuesRenderer;
