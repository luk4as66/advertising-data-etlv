// eslint-disable-next-line import/no-extraneous-dependencies
import HttpRequestMock from "http-request-mock";
import { fetchData } from "./dataUtils";

const mocker = HttpRequestMock.setup();

const mockCsvString =
  "Date,Campaign,Datasource,Click,Impressions\n" + "01.02.2012,Cmp1,Dts1,34,53";

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
    await fetchData("https://www.api.com/text-response", onCompleteMock);

    expect(onCompleteMock).toBeCalledWith(expectedResponse);
  });
});
