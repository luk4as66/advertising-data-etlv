export const SERVER_BASE =
  process.env.NODE_ENV === "development"
    ? ""
    : "http://adverity-challenge.s3-website-eu-west-1.amazonaws.com";
export const ADVERTISING_DATA_ENDPOINT = "/DAMKBAoDBwoDBAkOBAYFCw.csv";

export const ADVERTISING_DATA_URL = SERVER_BASE + ADVERTISING_DATA_ENDPOINT;
