import React, { useEffect, useState } from "react";
import "./App.css";
import { CircularProgress } from "@mui/material";
import { fetchData } from "./utils/dataUtils";
import Dashboard from "./components/dashboard/dashboard";
import { ADVERTISING_DATA_URL } from "./consts";
import { CampaignRaw } from "./utils/dataTypes";

function App() {
  const [data, setData] = useState<ReadonlyArray<CampaignRaw>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOnComplete = (allData: ReadonlyArray<CampaignRaw>) => {
    setData(allData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(ADVERTISING_DATA_URL, handleOnComplete);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <CircularProgress sx={{ padding: 3 }} />
      ) : (
        <Dashboard data={data} />
      )}
    </div>
  );
}

export default App;
