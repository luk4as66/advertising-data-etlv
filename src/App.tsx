import React, { useEffect } from "react";
import "./App.css";
import { getData } from "./utils";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
