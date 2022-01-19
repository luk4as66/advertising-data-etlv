export type Campaign = string;
export type Datasource = string;

export type CoreData = {
  Date: string;
  Clicks: number;
  Impressions: number;
};

export type CampaignRaw = {
  Campaign: Campaign;
  Datasource: Datasource;
} & CoreData;
