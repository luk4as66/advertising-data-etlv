import React, { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";
import MultipleSelect from "../../elements/multipleSelect/multipleSelect";
import { FilterFormType } from "./types";
import { Campaign, Datasource } from "../../utils/dataTypes";
import { getAvailableCampaigns, getAvailableDataSources } from "./utils";

function FilterForm({
  campaignsNames,
  dataSources,
  data,
  onApply,
}: FilterFormType): React.ReactElement {
  const [selectedDataSources, setSelectedDataSources] =
    useState<ReadonlyArray<string>>(dataSources);

  const [selectedCampaigns, setSelectedCampaigns] =
    useState<ReadonlyArray<string>>(campaignsNames);

  const availableCampaigns: ReadonlyArray<Campaign> = useMemo(
    () => getAvailableCampaigns(selectedDataSources, data),
    [selectedDataSources]
  );

  const availableDatasources: ReadonlyArray<Datasource> = useMemo(
    () => getAvailableDataSources(selectedCampaigns, data),
    [selectedCampaigns]
  );

  const handleDataSourceChange = (selection: ReadonlyArray<string>): void => {
    setSelectedDataSources(selection);
  };

  const handleCampaignsChange = (selection: ReadonlyArray<string>): void => {
    setSelectedCampaigns(selection);
  };

  const handleOnApply = () => {
    onApply(selectedDataSources, selectedCampaigns);
  };

  return (
    <Box width="inherit">
      <Typography variant="h5" component="h5" p={1}>
        Filter dimension values
      </Typography>
      <Stack spacing={2} p={2}>
        <MultipleSelect
          label="Datasource"
          selectData={
            selectedCampaigns.length > 0 ? availableDatasources : dataSources
          }
          selectedValue={selectedDataSources}
          onSelectionChange={handleDataSourceChange}
        />
        <MultipleSelect
          label="Campaigns"
          selectData={
            selectedDataSources.length > 0 ? availableCampaigns : campaignsNames
          }
          selectedValue={selectedCampaigns}
          onSelectionChange={handleCampaignsChange}
        />
        <Button variant="contained" onClick={handleOnApply}>
          Apply
        </Button>
      </Stack>
    </Box>
  );
}

export default FilterForm;
