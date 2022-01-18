import { decimateData, getGraphDataConfig, getSortedData } from "./utils";
import { CampaignRaw } from "../../utils/dataTypes";

describe("getSortedData", () => {
  test("should provide data sorted by date", () => {
    const mockData: ReadonlyArray<CampaignRaw> = [
      {
        Date: "03.03.2020",
        Datasource: "source1",
        Clicks: 12,
        Campaign: "camapign1",
        Impressions: 4,
      },
      {
        Date: "25.02.2022",
        Datasource: "source3",
        Clicks: 2,
        Campaign: "camapign3",
        Impressions: 1,
      },
      {
        Date: "01.02.2019",
        Datasource: "source2",
        Clicks: 34,
        Campaign: "camapign2",
        Impressions: 23,
      },
    ];

    const expected = {
      clicks: [34, 12, 2],
      dates: ["01.02.2019", "03.03.2020", "25.02.2022"],
      impressions: [23, 4, 1],
    };

    const givenSortedData = getSortedData(mockData);
    expect(givenSortedData).toEqual(expected);
  });
});

describe("decimateData", () => {
  test("should return same data if input data length < 100", () => {
    const mockData = ["one"];
    const givenDecimatedData = decimateData(mockData);
    expect(givenDecimatedData).toEqual(mockData);
  });

  test("should return data / 2 if length [100,1000)", () => {
    const mockData = new Array(500);
    const givenDecimatedData = decimateData(mockData);
    expect(givenDecimatedData.length).toEqual(250);
  });

  test("should return data / 30 if length [1000,10000)", () => {
    const mockData = new Array(5999);
    const givenDecimatedData = decimateData(mockData);
    expect(givenDecimatedData.length).toEqual(200);
  });

  test("should return data / 300 if length [10000, n)", () => {
    const mockData = new Array(50000);
    const givenDecimatedData = decimateData(mockData);
    expect(givenDecimatedData.length).toEqual(250);
  });
});

describe("getGraphDataConfig", () => {
  const expectedGraphConfig = {
    datasets: [
      {
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        data: [1, 2, 3, 4],
        label: "Clicks",
        yAxisID: "y",
      },
      {
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
        data: [10, 20, 30, 40],
        label: "Impressions",
        yAxisID: "y1",
      },
    ],
    labels: ["Label1", "label2", "label3", "label4"],
  };

  test("should return config", () => {
    const mockLabels = ["Label1", "label2", "label3", "label4"];
    const mockClicks = [1, 2, 3, 4];
    const mockImpressions = [10, 20, 30, 40];
    const givenGraphDataConfig = getGraphDataConfig(
      mockLabels,
      mockClicks,
      mockImpressions
    );

    expect(givenGraphDataConfig).toEqual(expectedGraphConfig);
  });
});
