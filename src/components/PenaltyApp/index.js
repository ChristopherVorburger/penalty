import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import ScrollToTop from "../ScrollToTop";
import Layout from "../Layout";
import Loader from "../Loader";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Penalties from "../../pages/Penalties";
import AddPenalty from "../../pages/AddPenalty";
import Gallery from "../../pages/Gallery";
import MemoryGame from "../../pages/MemoryGame";
import EditPenaltyDialog from "../EditPenaltyDialog";
import ErrorFallback from "../../components/ErrorFallback";

import { AuthContextProvider } from "../../contexts/authContext";
import { PenaltiesContextProvider } from "../../contexts/penaltiesContext";
import { useGlobal } from "../../contexts/globalContext";

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
  const { loading } = useGlobal();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ScrollToTop />
          <PenaltiesContextProvider>
            <AuthContextProvider>
              <Layout>
                {loading ? (
                  <Loader />
                ) : (
                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/penalties" element={<Penalties />}></Route>
                    <Route
                      path="/penalties/add"
                      element={<AddPenalty />}
                    ></Route>
                    <Route
                      path="/penalties/:id"
                      element={<EditPenaltyDialog />}
                    ></Route>
                    <Route path="/gallery" element={<Gallery />}></Route>
                    <Route path="/game" element={<MemoryGame />}></Route>
                  </Routes>
                )}
              </Layout>
            </AuthContextProvider>
          </PenaltiesContextProvider>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default PenaltyApp;
