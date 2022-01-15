import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./utils/dataUtils";
import Dashboard from "./components/dashboard/dashboard";
import { ADVERTISING_DATA_URL } from "./consts";
import { CampaignByDatasource } from "./utils/dataTypes";

function App() {
  const [dataByDataSource, setDataByDataSource] =
    useState<CampaignByDatasource>({});

  const handleOnComplete = (data: CampaignByDatasource) => {
    setDataByDataSource(data);
  };

  useEffect(() => {
    fetchData(ADVERTISING_DATA_URL, handleOnComplete);
  }, []);

  return (
    <div className="App">
      <Dashboard data={dataByDataSource} />
    </div>
  );
}

export default App;
