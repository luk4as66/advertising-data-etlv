import React from "react";
import Grid from "@mui/material/Grid";
import FilterForm from "../filterForm/filterForm";
import Graph from "../graph/graph";

function Dashboard(): React.ReactElement {
  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="flex-start" xs={4}>
        <FilterForm />
      </Grid>
      <Grid item container justifyContent="flex-start" xs={8}>
        <Graph />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
