import _ from "lodash";
import moment from "moment";
import { CampaignRaw, CoreData } from "../../utils/dataTypes";
import { GraphDataConfigType } from "./types";

export const graphConfigOptions = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Clicks and Impressions",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export const getGraphDataConfig = (
  labels: Array<string>,
  clicks: ReadonlyArray<number>,
  impressions: ReadonlyArray<number>
) => ({
  labels,
  datasets: [
    {
      label: "Clicks",
      data: clicks,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y",
    },
    {
      label: "Impressions",
      data: impressions,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y1",
    },
  ],
});

export const decimateData = <T>(data: ReadonlyArray<T>) => {
  const decimatedData: Array<T> = [];
  let increment = 0;
  if (data.length >= 10000) {
    increment = 200;
  } else if (data.length >= 1000) {
    increment = 30;
  } else if (data.length >= 100) {
    increment = 2;
  }

  if (increment > 0) {
    for (let i = 0; i < data.length; i += increment) {
      decimatedData.push(data[i]);
    }
  }

  return decimatedData.length > 0 ? decimatedData : data;
};

export const getSortedData = (
  data: ReadonlyArray<CampaignRaw>
): GraphDataConfigType => {
  const dates: Array<string> = [];
  const clicks: Array<number> = [];
  const impressions: Array<number> = [];

  const sortedData = _.sortBy(data, (a) =>
    moment(a.Date, "DD.MM.YYYY").toDate().getTime()
  );

  sortedData.forEach((coreData: CoreData) => {
    dates.push(coreData.Date);
    clicks.push(coreData.Clicks);
    impressions.push(coreData.Impressions);
  });

  return {
    dates,
    clicks,
    impressions,
  };
};
