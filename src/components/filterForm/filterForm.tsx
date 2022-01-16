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
}: FilterFormType): React.ReactElement {
  const [selectedDataSources, setSelectedDataSources] = useState<
    ReadonlyArray<string>
  >([]);

  const [selectedCampaigns, setSelectedCampaigns] = useState<
    ReadonlyArray<string>
  >([]);

  const availableCampaigns: ReadonlyArray<Campaign> = useMemo(() => {
    // TODO: same function as is in dashboard;
    const campaigns: Array<Campaign> = [];

    selectedDataSources.forEach((dataSource) => {
      campaigns.push(...Object.keys(data[dataSource]));
    });

    return _.uniq(campaigns);
  }, [selectedDataSources]);

  const availableDatasources: ReadonlyArray<Datasource> = useMemo(() => {
    const sources: Array<Datasource> = [];

    dataSources.forEach((dataSource) => {
      const campaignsInDataSource = Object.keys(data[dataSource]);
      const isCampaignInDataSource = _.find(campaignsInDataSource, (campaign) =>
        _.includes(selectedCampaigns, campaign)
      );
      if (isCampaignInDataSource) {
        sources.push(dataSource);
      }
    });

    return sources;
  }, [selectedCampaigns]);

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
        <Button variant="contained">Apply</Button>
      </Stack>
    </Box>
  );
}

export default FilterForm;
