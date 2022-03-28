import React from "react";

import { Box } from "@mui/material";

import HandIcon from "../_customIcons/HandIcon";

import useStyles from "./styles";

const Loader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.loader__container}>
      <HandIcon />
    </Box>
  );
};

export default Loader;
