import { Campaign, CampaignRaw, Datasource } from "../../utils/dataTypes";

export type FilterFormType = {
  dataSources: ReadonlyArray<Datasource>;
  campaignsNames: ReadonlyArray<Campaign>;
  data: ReadonlyArray<CampaignRaw>;
  onApply: (
    dataSources: ReadonlyArray<Datasource>,
    campaigns: ReadonlyArray<Campaign>
  ) => void;
};
