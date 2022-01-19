import Papa from "papaparse";
import { CampaignRaw } from "./dataTypes";

export const fetchData = (
  url: string,
  // eslint-disable-next-line no-unused-vars
  onComplete: (data: ReadonlyArray<CampaignRaw>) => void,
  // eslint-disable-next-line no-unused-vars
  onError: (errorMessage: string) => void
) => {
  const all: Array<CampaignRaw> = [];

  Papa.parse<CampaignRaw>(url, {
    download: true,
    header: true,
    dynamicTyping: true,
    skipEmptyLines: "greedy",
    error: (error) => {
      onError(`${url}:${error.message}`);
    },
    step: (results) => {
      all.push(results.data);
    },
    complete: () => {
      onComplete(all);
    },
  });
};
