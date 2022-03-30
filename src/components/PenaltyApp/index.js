import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// Components
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

// Context
import { useGlobal } from "../../contexts/globalContext";

function PenaltyApp() {
  const { loading } = useGlobal();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ScrollToTop />
      <Layout>
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/penalties" element={<Penalties />}></Route>
            <Route path="/penalties/add" element={<AddPenalty />}></Route>
            <Route
              path="/penalties/:id"
              element={<EditPenaltyDialog />}
            ></Route>
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/game" element={<MemoryGame />}></Route>
          </Routes>
        )}
      </Layout>
    </ErrorBoundary>
  );
}

export default PenaltyApp;
