import { CampaignRaw } from "../../utils/dataTypes";

export type GraphType = {
  data: ReadonlyArray<CampaignRaw>;
};

export type GraphDataConfigType = {
  dates: Array<string>;
  clicks: Array<number>;
  impressions: Array<number>;
};
