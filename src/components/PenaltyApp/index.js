import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/penalties" element={<Penalties />} />
            <Route path="/penalties/add" element={<AddPenalty />} />
            <Route path="/penalties/:id" element={<EditPenaltyDialog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/game" element={<MemoryGame />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Layout>
    </ErrorBoundary>
  );
}

export default PenaltyApp;
