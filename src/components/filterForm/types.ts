import {
  Campaign,
  CampaignByDatasource,
  Datasource,
} from "../../utils/dataTypes";

export type FilterFormType = {
  dataSources: ReadonlyArray<Datasource>;
  campaignsNames: ReadonlyArray<Campaign>;
  data: CampaignByDatasource;
};
