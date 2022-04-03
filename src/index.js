import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Profiler } from "./components/Profiler";

ReactDOM.render(
  <React.StrictMode>
    <Profiler id="Penalty App" phases={[]}>
      <App />
    </Profiler>
  </React.StrictMode>,
  document.getElementById("root")
);
