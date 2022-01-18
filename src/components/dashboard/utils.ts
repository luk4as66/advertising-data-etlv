import _ from "lodash";
import { Campaign, CampaignRaw, Datasource } from "../../utils/dataTypes";

export const getSelectedData = (
  campaigns: ReadonlyArray<Campaign>,
  dataSources: ReadonlyArray<Datasource>,
  data: ReadonlyArray<CampaignRaw>
): ReadonlyArray<CampaignRaw> => {
  const selected: Array<CampaignRaw> = [];
  data.forEach((item) => {
    const isOnSelectedSources = _.find(
      dataSources,
      (datasource) => datasource === item.Datasource
    );
    const isOnSelectedCampaigns = _.find(
      campaigns,
      (campaign) => campaign === item.Campaign
    );

    if (isOnSelectedSources && isOnSelectedCampaigns) {
      selected.push(item);
    }
  });

  return selected;
};
