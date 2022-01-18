import React, { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";
import _ from "lodash";
import MultipleSelect from "../../elements/multipleSelect/multipleSelect";
import { FilterFormType } from "./types";
import { Campaign, Datasource } from "../../utils/dataTypes";

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

  const availableCampaigns: ReadonlyArray<Campaign> = useMemo(() => {
    const campaigns: Array<Campaign> = [];

    data.forEach((item) => {
      const isOnSelectedDataSources = _.find(
        selectedDataSources,
        (selectedDatasource) => selectedDatasource === item.Datasource
      );
      if (isOnSelectedDataSources) {
        campaigns.push(item.Campaign);
      }
    });

    return _.uniq(campaigns);
  }, [selectedDataSources]);

  const availableDatasources: ReadonlyArray<Datasource> = useMemo(() => {
    const sources: Array<Datasource> = [];

    selectedCampaigns.forEach((campaign) => {
      const datasource = _.find(
        data,
        (dataItem) => dataItem.Campaign === campaign
      );
      if (datasource) {
        sources.push(datasource.Datasource);
      }
    });

    return _.uniq(sources);
  }, [selectedCampaigns]);

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
