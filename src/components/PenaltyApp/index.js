import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

import Layout from "../Layout";

import { PenaltiesContextProvider } from "../../contexte/penaltiesContext";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function PenaltyApp() {
  return (
    <ThemeProvider theme={theme}>
      <PenaltiesContextProvider>
        <Router>
          <Layout>
            <Typography variant="h3">Hello World</Typography>
          </Layout>
        </Router>
      </PenaltiesContextProvider>
    </ThemeProvider>
  );
}

export default PenaltyApp;
