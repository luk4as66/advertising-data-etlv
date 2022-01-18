import React, { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import _ from "lodash";
import FilterForm from "../filterForm/filterForm";
import Graph from "../graph/graph";
import { DashboardType } from "./types";
import { Campaign, CampaignRaw, Datasource } from "../../utils/dataTypes";
import { getSelectedData } from "./utils";

function Dashboard({ data }: DashboardType): React.ReactElement {
  const [selectedData, setSelectedData] =
    useState<ReadonlyArray<CampaignRaw>>(data);

  const dataSources = useMemo(
    () => _.chain(data).map("Datasource").uniq().value(),
    [data]
  );

  const campaigns = useMemo(
    () => _.chain(data).map("Campaign").uniq().value(),
    [data]
  );

  const handleOnApply = (
    sourcesNames: ReadonlyArray<Datasource>,
    campaignsNames: ReadonlyArray<Campaign>
  ) => {
    setSelectedData(getSelectedData(campaignsNames, sourcesNames, data));
  };

  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="flex-start" xs={4}>
        <FilterForm
          dataSources={dataSources}
          campaignsNames={campaigns}
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

export default React.memo(Dashboard);
