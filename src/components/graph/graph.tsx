import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GraphType } from "./types";
import {
  decimateData,
  getGraphDataConfig,
  getSortedData,
  graphConfigOptions,
} from "./utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ data }: GraphType): React.ReactElement {
  const dataSeries = useMemo(() => {
    const decimatedData = decimateData(data);
    const sortedData = getSortedData(decimatedData);

    return getGraphDataConfig(
      sortedData.dates,
      sortedData.clicks,
      sortedData.impressions
    );
  }, [data]);

  return <Line options={graphConfigOptions} data={dataSeries} />;
}

export default Graph;
