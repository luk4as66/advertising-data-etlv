import React, { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import _ from "lodash";
import FilterForm from "../filterForm/filterForm";
import Graph from "../graph/graph";
import { DashboardType } from "./types";
import { Campaign, CampaignRaw, Datasource } from "../../utils/dataTypes";

function Dashboard({ data }: DashboardType): React.ReactElement {
  const [selectedDataSources, setSelectedDataSources] = useState<
    ReadonlyArray<Datasource>
  >([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<
    ReadonlyArray<Campaign>
  >([]);

  const dataSources = useMemo(
    () => _.chain(data).map("Datasource").uniq().value(),
    [data]
  );

  const campaignsNames = useMemo(
    () => _.chain(data).map("Campaign").uniq().value(),
    [data]
  );

  const selectedData = useMemo(() => {
    const selected: Array<CampaignRaw> = [];
    data.forEach((item) => {
      const isOnSelectedSources = _.find(
        selectedDataSources,
        (datasource) => datasource === item.Datasource
      );
      const isOnSelectedCampaigns = _.find(
        selectedCampaigns,
        (campaign) => campaign === item.Campaign
      );

      if (isOnSelectedSources && isOnSelectedCampaigns) {
        selected.push(item);
      }
    });

    return selected;
  }, [selectedDataSources, selectedCampaigns]);

  const handleOnApply = (
    sources: ReadonlyArray<Datasource>,
    campaigns: ReadonlyArray<Campaign>
  ) => {
    setSelectedDataSources(sources);
    setSelectedCampaigns(campaigns);
  };

  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="flex-start" xs={4}>
        <FilterForm
          dataSources={dataSources}
          campaignsNames={campaignsNames}
          data={data}
          onApply={handleOnApply}
        />
      </Grid>
      <Grid item container justifyContent="flex-start" xs={8}>
        <Graph data={selectedData} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
