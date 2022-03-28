import { CssBaseline } from "@mui/material";
import * as React from "react";

import PenaltyApp from "./components/PenaltyApp";

import { GlobalContextProvider } from "./contexts/globalContext";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <CssBaseline />
        <PenaltyApp />
      </GlobalContextProvider>
    </>
  );
}

export default App;
