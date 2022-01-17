import Papa from "papaparse";
import { CampaignRaw } from "./dataTypes";

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
  onComplete: (data: ReadonlyArray<CampaignRaw>) => void
) => {
  if (isValidUrl(url)) {
    const all: Array<CampaignRaw> = [];

    Papa.parse<CampaignRaw>(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      error: (error) => {
        console.log("Error", error);
      },
      step: (results) => {
        all.push(results.data);
      },
      complete: () => {
        onComplete(all);
      },
    });
  }
};
