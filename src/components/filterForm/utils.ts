import _ from "lodash";
import { Campaign, CampaignRaw, Datasource } from "../../utils/dataTypes";

export const getAvailableCampaigns = (
  dataSources: ReadonlyArray<Datasource>,
  data: ReadonlyArray<CampaignRaw>
): ReadonlyArray<Campaign> => {
  const campaigns: Array<Campaign> = [];

  data.forEach((item) => {
    const isOnSelectedDataSources = _.find(
      dataSources,
      (dataSource) => dataSource === item.Datasource
    );
    if (isOnSelectedDataSources) {
      campaigns.push(item.Campaign);
    }
  });

  return _.uniq(campaigns);
};

export const getAvailableDataSources = (
  campaigns: ReadonlyArray<Datasource>,
  data: ReadonlyArray<CampaignRaw>
): ReadonlyArray<Datasource> => {
  const sources: Array<Datasource> = [];

  campaigns.forEach((campaign) => {
    const datasource = _.find(
      data,
      (dataItem) => dataItem.Campaign === campaign
    );
    if (datasource) {
      sources.push(datasource.Datasource);
    }
  });

  return _.uniq(sources);
};
