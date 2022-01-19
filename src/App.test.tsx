import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HttpRequestMock from "http-request-mock";
import { Method } from "http-request-mock/dist/types";
import App from "./App";
import { CampaignRaw } from "./utils/dataTypes";
import * as dataUtils from "./utils/dataUtils";
import { ADVERTISING_DATA_URL } from "./consts";

const mocker = HttpRequestMock.setup();

const mockCsvString =
  "Date,Campaign,Datasource,Click,Impressions\n01.02.2012,Cmp1,Dts1,34,53";

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
  test("should render progressbar ", async () => {
    render(<App />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("should render error ", async () => {
    mocker.mock({
      url: ADVERTISING_DATA_URL,
      status: 404,
      method: Method.GET,
      body: "Page not found",
    });
    render(<App />);

    const error = await waitFor(() =>
      screen.getByText(`${ADVERTISING_DATA_URL}:Not Found`)
    );

    expect(error).toBeInTheDocument();
  });

  test("should render dashboard", async () => {
    mocker.get(ADVERTISING_DATA_URL, mockCsvString);
    render(<App />);

    const error = await waitFor(() =>
      screen.getByText("Filter dimension values")
    );

    expect(error).toBeInTheDocument();
  });
});
