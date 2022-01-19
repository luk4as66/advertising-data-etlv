import { CampaignRaw } from "../../utils/dataTypes";
import { getAvailableCampaigns, getAvailableDataSources } from "./utils";

const mockData: ReadonlyArray<CampaignRaw> = [
  {
    Date: "03.03.2020",
    Datasource: "source1",
    Clicks: 12,
    Campaign: "campaign1",
    Impressions: 4,
  },
  {
    Date: "25.02.2022",
    Datasource: "source3",
    Clicks: 2,
    Campaign: "campaign3",
    Impressions: 1,
  },
  {
    Date: "01.02.2019",
    Datasource: "source2",
    Clicks: 34,
    Campaign: "campaign2",
    Impressions: 23,
  },
];

describe("getAvailableCampaigns", () => {
  test("should provide available campaigns base on data sources", () => {
    const mockDataSource = ["source3", "source2"];
    const givenAvailableCampaigns = getAvailableCampaigns(
      mockDataSource,
      mockData
    );

    expect(givenAvailableCampaigns).toEqual(["campaign3", "campaign2"]);
  });

  test("should not fail if no match", () => {
    const mockDataSource = ["source99"];
    const givenAvailableCampaigns = getAvailableCampaigns(
      mockDataSource,
      mockData
    );

    expect(givenAvailableCampaigns).toEqual([]);
  });
});

describe("getAvailableDataSources", () => {
  test("should provide available data sources base on campaigns", () => {
    const mockCampaigns = ["campaign2", "campaign1"];
    const givenAvailableDataSources = getAvailableDataSources(
      mockCampaigns,
      mockData
    );

    expect(givenAvailableDataSources).toEqual(["source2", "source1"]);
  });

  test("should not fail if no match", () => {
    const mockCampaigns = ["campaign99"];
    const givenAvailableDataSources = getAvailableDataSources(
      mockCampaigns,
      mockData
    );

    expect(givenAvailableDataSources).toEqual([]);
  });
});
