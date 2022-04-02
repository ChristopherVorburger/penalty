import * as React from "react";

import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { usePenalties } from "../../contexts/penaltiesContext";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Componant who return pending penalties
const PendingPhrase = () => {
  const [penaltiesPendingPhrase, setPenaltiesPendingPhrase] =
    React.useState("");
  const { penalties } = usePenalties();

  // Sum of the total penalties
  const totalPenalties = penalties?.map(
    (penaltyObject) => penaltyObject.number
  );
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  React.useEffect(() => {
    if (!penalties) {
      return setPenaltiesPendingPhrase(
        <CircularProgress size={15} color="inherit" />
      );
    } else {
      setPenaltiesPendingPhrase(
        `Bienvenue sur Beu.com, nous sommes le ${format(
          new Date(),
          " d MMMM y",
          { locale: fr }
        )} et Thomas doit s'acquitter de ${totalPenalties?.reduce(
          reducer,
          0
        )} heouss`
      );
    }
  }, [penalties, totalPenalties]);

  return (
    <Typography name="pending-phrase">{penaltiesPendingPhrase}</Typography>
  );
};

export default PendingPhrase;
