import HttpRequestMock from "http-request-mock";
import { Method } from "http-request-mock/dist/types";
import { fetchData } from "./dataUtils";

const mocker = HttpRequestMock.setup();

const mockCsvString =
  "Date,Campaign,Datasource,Click,Impressions\n01.02.2012,Cmp1,Dts1,34,53";

describe("fetchData", () => {
  test("should fetch data and call onComplete", async () => {
    mocker.get("https://www.api.com/text-response", mockCsvString);
    const expectedResponse = [
      {
        Campaign: "Cmp1",
        Click: 34,
        Datasource: "Dts1",
        Impressions: 53,
        Date: "01.02.2012",
      },
    ];

    const onCompleteMock = jest.fn();
    const onError = jest.fn();
    await fetchData(
      "https://www.api.com/text-response",
      onCompleteMock,
      onError
    );

    expect(onCompleteMock).toBeCalledWith(expectedResponse);
    expect(onError).toBeCalledTimes(0);
  });

  test("should throw error when 404", async () => {
    mocker.mock({
      url: "https://www.api.com/text-response",
      status: 404,
      method: Method.GET,
      body: "Page not found",
    });
    const onCompleteMock = jest.fn();
    const onError = jest.fn();
    await fetchData(
      "https://www.api.com/text-response",
      onCompleteMock,
      onError
    );

    expect(onError).toBeCalledWith(
      "https://www.api.com/text-response:Not Found"
    );
  });

  test("should throw error when 500", async () => {
    mocker.mock({
      url: "https://www.api.com/text-response",
      status: 500,
      method: Method.GET,
      body: "Server Error",
    });
    const onCompleteMock = jest.fn();
    const onError = jest.fn();
    await fetchData(
      "https://www.api.com/text-response",
      onCompleteMock,
      onError
    );

    expect(onError).toBeCalledWith(
      "https://www.api.com/text-response:Internal Server Error"
    );
  });
});
