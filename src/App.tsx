import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./utils/dataUtils";
import Dashboard from "./components/dashboard/dashboard";
import { ADVERTISING_DATA_URL } from "./consts";
import { CampaignRaw } from "./utils/dataTypes";

function App() {
  const [data, setData] = useState<ReadonlyArray<CampaignRaw>>([]);

  const handleOnComplete = (allData: ReadonlyArray<CampaignRaw>) => {
    setData(allData);
  };

  useEffect(() => {
    fetchData(ADVERTISING_DATA_URL, handleOnComplete);
  }, []);

  return (
    <div className="App">
      <Dashboard data={data} />
    </div>
  );
}

export default App;
