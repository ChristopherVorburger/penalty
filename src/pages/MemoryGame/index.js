import * as React from "react";

// MUI
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";

// Components
import SingleCard from "../../components/SingleCard";
import HandIcon from "../../components/_customIcons/HandIcon";

// Game images
const cardImages = [
  { src: "/img/buche.jpg", matched: false },
  { src: "/img/clope.jpg", matched: false },
  { src: "/img/pervenche.jpg", matched: false },
  { src: "/img/placo.jpg", matched: false },
  { src: "/img/rs3.jpg", matched: false },
  { src: "/img/spritz.jpg", matched: false },
];

// Styles
const useStyles = makeStyles({
  btn__submit: {
    transition: "all .2s ease-in-out!important",
    "&:hover": {
      transition: "all .2s ease-in-out",
      transform: "scale(1.03)",
    },
  },
});

const MemoryGame = () => {
  const [cards, setCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);
  const [choiceOne, setChoiceOne] = React.useState(null);
  const [choiceTwo, setChoiceTwo] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);

  const classes = useStyles();

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare two selected cards
  React.useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // First shuffle
  React.useEffect(() => {
    shuffleCards();
  }, []);

  // Reset choices & increase turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <Box
      p="1rem"
      sx={{
        "&.MuiBox-root": {
          backgroundColor: "#f4f4f4",
        },
      }}
    >
      <Typography variant="h6" align="center" m="1rem 0">
        Beu Game
      </Typography>
      <Box sx={{ maxWidth: "900px", m: "auto" }}>
        <Grid container spacing={3}>
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </Grid>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box m="1rem 0">
          <Typography className={classes.field}>Score : {turns}</Typography>
        </Box>
        <Box>
          <Button
            type="submit"
            variant="outlined"
            className={classes.btn__submit}
            endIcon={<HandIcon />}
            onClick={() => shuffleCards()}
          >
            Nouveau jeu
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MemoryGame;
