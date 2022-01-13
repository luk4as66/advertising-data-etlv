import React, { useEffect } from "react";
import "./App.css";
// import { fetchData } from "./utils/dataUtils";
import Dashboard from "./components/dashboard/dashboard";
// simport { ADVERTISING_DATA_URL } from "./consts";

function App() {
  useEffect(() => {
    // fetchData(ADVERTISING_DATA_URL);
  }, []);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
