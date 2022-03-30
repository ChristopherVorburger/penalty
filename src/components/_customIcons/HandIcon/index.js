import React from "react";

import { Box } from "@mui/material";
import PanToolRoundedIcon from "@mui/icons-material/PanToolRounded";

import useStyles from "./styles";

const HandIcon = () => {
  const classes = useStyles();

  return (
    <Box align="center">
      <PanToolRoundedIcon className={classes.icon__hand} />
    </Box>
  );
};

export default HandIcon;
