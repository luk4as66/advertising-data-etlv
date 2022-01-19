import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HttpRequestMock from "http-request-mock";
import { Method } from "http-request-mock/dist/types";
import App from "./App";
import { ADVERTISING_DATA_URL } from "./consts";

const mocker = HttpRequestMock.setup();

const mockCsvString =
  "Date,Campaign,Datasource,Click,Impressions\n01.02.2012,Cmp1,Dts1,34,53";

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
