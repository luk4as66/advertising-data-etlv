import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import MultipleSelect from "../../elements/multipleSelect/multipleSelect";

function FilterForm(): React.ReactElement {
  const selectData = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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
    <div>
      <Typography variant="h5" component="h5" gutterBottom>
        Filter dimension values
      </Typography>
      <Stack spacing={2}>
        <MultipleSelect
          label="Datasource"
          selectData={selectData}
          selectedValue={selectedDataSources}
          onSelectionChange={handleDataSourceChange}
        />
        <MultipleSelect
          label="Campaigns"
          selectData={selectData}
          selectedValue={selectedCampaigns}
          onSelectionChange={handleCampaignsChange}
        />
        <Button variant="contained">Apply</Button>
      </Stack>
    </div>
  );
}

export default FilterForm;
