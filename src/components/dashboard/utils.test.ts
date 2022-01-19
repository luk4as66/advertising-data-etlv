import { CampaignRaw } from "../../utils/dataTypes";
import { getSelectedData } from "./utils";

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

describe("getSelectedData", () => {
  test("should select data basis on datasources and campaigns", () => {
    const mockDataSource = ["source3", "source2"];
    const mockCampaigns = ["campaign2", "campaign1"];
    const givenSelectedData = getSelectedData(
      mockCampaigns,
      mockDataSource,
      mockData
    );

    expect(givenSelectedData).toEqual([
      {
        Campaign: "campaign2",
        Clicks: 34,
        Datasource: "source2",
        Date: "01.02.2019",
        Impressions: 23,
      },
    ]);
  });

  test("should return empty array if no intersection", () => {
    const mockDataSource = ["source3"];
    const mockCampaigns = ["campaign1"];
    const givenSelectedData = getSelectedData(
      mockCampaigns,
      mockDataSource,
      mockData
    );

    expect(givenSelectedData).toEqual([]);
  });
});
