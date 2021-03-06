import React from "react";

import { Container, Grid, Typography } from "@mui/material";

import Loader from "../../components/Loader";
import PenaltyCard from "../../components/PenaltyCard";

import { usePenalties } from "../../contexts/penaltiesContext";

const Penalties = () => {
  const { penalties } = usePenalties();

  if (!penalties) {
    return <Loader />;
  }
  if (penalties.length === 0) {
    return (
      <Typography textAlign="center" variant="h6">
        Aucune contravention, étrange...
      </Typography>
    );
  }

  return (
    <Container>
      <Grid pt="1rem" container direction="column" spacing={5}>
        {penalties.map((penalty) => (
          <Grid item key={penalty.id}>
            <PenaltyCard penalty={penalty} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Penalties;
