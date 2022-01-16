import React, { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import _ from "lodash";
import FilterForm from "../filterForm/filterForm";
import Graph from "../graph/graph";
import { DashboardType } from "./types";
import {
  Campaign,
  CampaignByDatasource,
  Datasource,
} from "../../utils/dataTypes";

function Dashboard({ data }: DashboardType): React.ReactElement {
  const [selectedDataSources, setSelectedDataSources] = useState<
    ReadonlyArray<Datasource>
  >([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<
    ReadonlyArray<Campaign>
  >([]);

  const dataSources = useMemo(() => Object.keys(data), [data]);

  const campaignsNames = useMemo(() => {
    const campaigns: Array<Campaign> = [];

    dataSources.forEach((dataSource) => {
      campaigns.push(...Object.keys(data[dataSource]));
    });

    return _.uniq(campaigns);
  }, [data]);

  const selectedData = useMemo(() => {
    const selected: CampaignByDatasource = {};

    selectedDataSources.forEach((dataSource) => {
      selected[dataSource] = {};
      const src = data[dataSource];

      selectedCampaigns.forEach((cmp) => {
        if (src[cmp]) {
          selected[dataSource][cmp] = src[cmp];
        }
      });
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

  console.log("Selected data", selectedData);

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
        <Graph />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
