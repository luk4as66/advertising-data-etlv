import Papa from "papaparse";

// TODO: Improve validation
const isValidUrl = (url: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};

export const fetchData = (url: string) => {
  if (isValidUrl(url)) {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: "greedy",
      error: (error) => {
        console.log("Error", error);
      },
      step: (results) => {
        console.log("Step", results);
      },
      complete: (results) => {
        console.log("Complete", results);
      },
    });
  }
};
