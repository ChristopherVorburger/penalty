import React from "react";

import { Container } from "@mui/material";
import PanToolRoundedIcon from "@mui/icons-material/PanToolRounded";

import useStyles from "./styles";

const HandIcon = () => {
  const classes = useStyles();

  return (
    <Container align="center">
      <PanToolRoundedIcon className={classes.icon__hand} />
    </Container>
  );
};

export default HandIcon;
