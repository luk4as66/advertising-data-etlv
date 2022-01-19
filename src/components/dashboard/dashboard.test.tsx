import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "./dashboard";
import { CampaignRaw } from "../../utils/dataTypes";
import * as utils from "./utils";

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
    Date: "25.03.2022",
    Datasource: "source3",
    Clicks: 32,
    Campaign: "campaign4",
    Impressions: 23,
  },
  {
    Date: "01.02.2019",
    Datasource: "source2",
    Clicks: 34,
    Campaign: "campaign2",
    Impressions: 23,
  },
];

describe("Dashboard", () => {
  test("should render correctly ", async () => {
    render(<Dashboard data={mockData} />);
    const labelDataSource = screen.getByText("Datasource");
    const labelCampaigns = screen.getByText("Campaigns");
    expect(labelDataSource).toBeInTheDocument();
    expect(labelCampaigns).toBeInTheDocument();
  });

  test("should call on apply ", async () => {
    const getSelectedDataSpy = jest.spyOn(utils, "getSelectedData");
    render(<Dashboard data={mockData} />);
    fireEvent.click(screen.getByTestId("apply"));
    expect(getSelectedDataSpy).toBeCalledWith(
      ["campaign1", "campaign3", "campaign4", "campaign2"],
      ["source1", "source3", "source2"],
      mockData
    );
  });
});
