import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
import _ from "lodash";
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

    return _.uniq(campaigns);
  }, [data]);

  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="flex-start" xs={4}>
        <FilterForm
          dataSources={dataSources}
          campaignsNames={campaignsNames}
          data={data}
        />
      </Grid>
      <Grid item container justifyContent="flex-start" xs={8}>
        <Graph />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
