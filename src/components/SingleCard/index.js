import React from "react";

import "./style.css";

import { Card, CardMedia, Grid } from "@mui/material";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <Grid item lg={3} xs={4}>
      <Card className="card" elevation={3}>
        <div className={flipped ? "flipped" : ""}>
          <CardMedia
            className="front"
            component="img"
            image={card.src}
            alt="card front"
          />
          <CardMedia
            className="back"
            component="img"
            image="img/point.jpg"
            alt="card back"
            onClick={handleClick}
          />
        </div>
      </Card>
    </Grid>
  );
};

export default SingleCard;
