import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";
import MultipleSelect from "../../elements/multipleSelect/multipleSelect";
import { FilterFormType } from "./types";

function FilterForm({
  campaignsNames,
  dataSources,
}: FilterFormType): React.ReactElement {
  const [selectedDataSources, setSelectedDataSources] = useState<
    ReadonlyArray<string>
  >([]);

  const [selectedCampaigns, setSelectedCampaigns] = useState<
    ReadonlyArray<string>
  >([]);

  const handleDataSourceChange = (selection: ReadonlyArray<string>): void => {
    setSelectedDataSources(selection);
  };

  const handleCampaignsChange = (selection: ReadonlyArray<string>): void => {
    setSelectedCampaigns(selection);
  };

  return (
    <Box width="inherit">
      <Typography variant="h5" component="h5" p={1}>
        Filter dimension values
      </Typography>
      <Stack spacing={2} p={2}>
        <MultipleSelect
          label="Datasource"
          selectData={dataSources}
          selectedValue={selectedDataSources}
          onSelectionChange={handleDataSourceChange}
        />
        <MultipleSelect
          label="Campaigns"
          selectData={campaignsNames}
          selectedValue={selectedCampaigns}
          onSelectionChange={handleCampaignsChange}
        />
        <Button variant="contained">Apply</Button>
      </Stack>
    </Box>
  );
}

export default FilterForm;
