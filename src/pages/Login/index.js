import React from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useAuth } from "../../contexts/authContext";

const Profil = ({ error }) => {
  const { email, password, inputAction, handleLogin } = useAuth();

  return (
    <Box pt="1rem" display="flex" justifyContent="center">
      <form noValidate autoComplete="off" onSubmit={handleLogin}>
        <Box mb="1rem">
          <TextField
            name="email"
            value={email}
            onChange={inputAction}
            label="Email"
            variant="outlined"
            required
            autoComplete="on"
            type="email"
          />
        </Box>
        <Box mb="1rem">
          <TextField
            name="password"
            value={password}
            onChange={inputAction}
            label="Mot de passe"
            variant="outlined"
            required
            type="password"
          />
        </Box>
        <Typography color="error">
          {error ? "Email ou mot de passe incorrect" : ""}
        </Typography>
        <Button
          type="submit"
          variant="outlined"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Se connecter
        </Button>
      </form>
    </Box>
  );
};

export default Profil;
