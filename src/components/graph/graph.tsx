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
import _ from "lodash";
import moment from "moment";
import { GraphType } from "./types";
import { CoreData } from "../../utils/dataTypes";
import { deciamteData, getGraphDataConfig, graphConfigOptions } from "./utils";

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
    const dates: Array<string> = [];
    const clicks: Array<number> = [];
    const impressions: Array<number> = [];

    const getDataToSort = deciamteData(data);

    const sortedData = _.sortBy(getDataToSort, (a) =>
      moment(a.Date, "DD.MM.YYYY").toDate().getTime()
    );

    sortedData.forEach((coreData: CoreData) => {
      dates.push(coreData.Date);
      clicks.push(coreData.Clicks);
      impressions.push(coreData.Impressions);
    });

    return getGraphDataConfig(dates, clicks, impressions);
  }, [data]);

  return <Line options={graphConfigOptions} data={dataSeries} />;
}

export default Graph;
