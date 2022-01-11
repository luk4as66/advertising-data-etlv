import Papa from "papaparse";
import { DATA_URL } from "./consts";

export const getData = async () => {
  try {
    const response = await fetch(DATA_URL);
    if (response.status === 200) {
      const data = await response.text();
      // TODO: try to use with worker
      Papa.parse(data, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: "greedy",
        step: (results) => {
          console.log("Results", results);
        },
      });
    } else {
      throw Error(String(response.status));
    }
  } catch (error) {
    console.log("Error", error);
  }
};
