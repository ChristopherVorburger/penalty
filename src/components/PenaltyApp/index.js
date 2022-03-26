import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "../Layout";
import Home from "../../pages/Home";

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
            <Routes>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </Layout>
        </Router>
      </PenaltiesContextProvider>
    </ThemeProvider>
  );
}

export default PenaltyApp;
