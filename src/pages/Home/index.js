import React from "react";

// MUI
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";

// Components
import PendingPhrase from "../../components/PendingPhrase";
import HandIcon from "../../components/_customIcons/HandIcon";

// Styles
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  const audioTune = new Audio("/sound/MerciThomas.mp3");

  // Load audio
  React.useEffect(() => {
    audioTune.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to play sound on click
  const playSound = () => {
    audioTune.play();
  };

  return (
    <Box p="2rem" className={classes.home__container}>
      <Box className={classes.home__phrase}>
        <Typography variant="h6" align="center">
          <PendingPhrase />
        </Typography>
      </Box>
      <Box>
        <Typography align="center">
          <Button
            type="button"
            variant="outlined"
            className={classes.home__button_submit}
            endIcon={<HandIcon />}
            onClick={playSound}
            sx={{ textTransform: "none" }}
          >
            Hymne national
          </Button>
        </Typography>
      </Box>
      <Box className={classes.home__images}>
        <img
          className={classes.home__image_police}
          src="images/policeman.png"
          alt="Policier à moustache pas content"
        />
      </Box>
      <Box>
        <Typography align="center">
          Heouss : Coup sec, porté au niveau des côtes flottantes main ouverte
          en prononcant l'onomatopée 'Heouss'.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
