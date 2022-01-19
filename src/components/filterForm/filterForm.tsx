import React, { useCallback, useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";
import _ from "lodash";
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
    [selectedDataSources, data]
  );

  const availableDatasources: ReadonlyArray<Datasource> = useMemo(
    () => getAvailableDataSources(selectedCampaigns, data),
    [selectedCampaigns, data]
  );

  const handleDataSourceChange = (selection: ReadonlyArray<string>): void => {
    setSelectedDataSources(selection);
  };

  const handleCampaignsChange = (selection: ReadonlyArray<string>): void => {
    setSelectedCampaigns(selection);
  };

  const handleOnApply = useCallback(() => {
    const campaigns =
      selectedCampaigns.length > availableCampaigns.length
        ? availableCampaigns
        : selectedCampaigns;

    const datasources =
      selectedDataSources.length > availableDatasources.length
        ? availableDatasources
        : selectedDataSources;

    onApply(datasources, campaigns);
  }, [
    selectedCampaigns,
    availableCampaigns,
    selectedDataSources,
    availableDatasources,
    onApply,
  ]);

  return (
    <Box width="inherit">
      <Typography variant="h5" component="h5" p={1}>
        Filter dimension values
      </Typography>
      <Stack spacing={2} p={2}>
        <MultipleSelect
          testId="datasource-select"
          label="Datasource"
          selectData={
            selectedCampaigns.length > 0 ? availableDatasources : dataSources
          }
          selectedValue={selectedDataSources}
          onSelectionChange={handleDataSourceChange}
        />
        <MultipleSelect
          testId="campaigns-select"
          label="Campaigns"
          selectData={
            selectedDataSources.length > 0 ? availableCampaigns : campaignsNames
          }
          selectedValue={selectedCampaigns}
          onSelectionChange={handleCampaignsChange}
        />
        <Button
          variant="contained"
          onClick={handleOnApply}
          data-testid="apply"
          disabled={
            _.isEmpty(selectedDataSources) || _.isEmpty(selectedCampaigns)
          }
        >
          Apply
        </Button>
      </Stack>
    </Box>
  );
}

export default React.memo(FilterForm);
