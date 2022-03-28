import React from "react";

import { Container, Grid } from "@mui/material";

import Loader from "../../components/Loader";
import PenaltyCard from "../../components/PenaltyCard";

import { usePenalties } from "../../contexts/penaltiesContext";

const Penalties = () => {
  const { penalties } = usePenalties();

  if (!penalties) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        direction="column"
        spacing={5}
        sx={{ paddingTop: "1rem" }}
      >
        {/* Display penalty cards */}
        {penalties?.map((penalty) => (
          <Grid item key={penalty.id}>
            <PenaltyCard penalty={penalty} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Penalties;
