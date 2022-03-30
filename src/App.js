import * as React from "react";

// MUI
import { CssBaseline } from "@mui/material";

// Components
import PenaltyApp from "./components/PenaltyApp";

// Contexts
import { AppProviders } from "./contexts";

function App() {
  return (
    <AppProviders>
      <CssBaseline />
      <PenaltyApp />
    </AppProviders>
  );
}

export default App;
