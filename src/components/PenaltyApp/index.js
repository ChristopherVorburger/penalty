import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "../Layout";
import Home from "../../pages/Home";
import Login from "../../pages/Login";

import { PenaltiesContextProvider } from "../../contexts/penaltiesContext";
import { AuthContextProvider } from "../../contexts/authContext";

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
      <Router>
        <PenaltiesContextProvider>
          <AuthContextProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
              </Routes>
            </Layout>
          </AuthContextProvider>
        </PenaltiesContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default PenaltyApp;
