import Papa from "papaparse";
import { CampaignByDatasource, CampaignRaw } from "./dataTypes";

// TODO: Improve validation
const isValidUrl = (url: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};

export const fetchData = (
  url: string,
  // eslint-disable-next-line no-unused-vars
  onComplete: (data: CampaignByDatasource) => void
) => {
  if (isValidUrl(url)) {
    const data: CampaignByDatasource = {};

    Papa.parse<CampaignRaw>(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      error: (error) => {
        console.log("Error", error);
      },
      step: (results) => {
        const dataSource = results.data.Datasource;
        const campaign = results.data.Campaign;

        const coreData = {
          Date: results.data.Date,
          Clicks: results.data.Clicks,
          Impressions: results.data.Impressions,
        };

        if (data[dataSource]) {
          if (data[dataSource][campaign]) {
            data[dataSource][campaign].push(coreData);
          } else {
            data[dataSource][campaign] = [coreData];
          }
        } else {
          data[dataSource] = {};
          data[dataSource][campaign] = [coreData];
        }
      },
      complete: () => {
        onComplete(data);
      },
    });
  }
};
