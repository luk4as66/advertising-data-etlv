import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
import FilterForm from "../filterForm/filterForm";
import Graph from "../graph/graph";
import { DashboardType } from "./types";
import { Campaign } from "../../utils/dataTypes";

function Dashboard({ data }: DashboardType): React.ReactElement {
  const dataSources = useMemo(() => Object.keys(data), [data]);

  const campaignsNames = useMemo(() => {
    const campaigns: Array<Campaign> = [];

    dataSources.forEach((dataSource) => {
      campaigns.push(...Object.keys(data[dataSource]));
    });
    return campaigns;
  }, [data]);

  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="flex-start" xs={5}>
        <FilterForm dataSources={dataSources} campaignsNames={campaignsNames} />
      </Grid>
      <Grid item container justifyContent="flex-start" xs={7}>
        <Graph />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
