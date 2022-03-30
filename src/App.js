import * as React from "react";

// MUI
import { CssBaseline } from "@mui/material";

// Components
import PenaltyApp from "./components/PenaltyApp";

// Context
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
