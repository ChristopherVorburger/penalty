import React from "react";

// MUI
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

// Date fns
import { zonedTimeToUtc } from "date-fns-tz";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Firebase
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../firebase-config";

// Context
import { useAuth } from "../../contexts/authContext";

// Styles
import useStyles from "./styles";

const PenaltyCard = ({ penalty }) => {
  const classes = useStyles();
  const { authUser: auth } = useAuth();

  // Handle delete penalty submit
  const handleDeleteSubmit = (id) => {
    const docRef = doc(database, "penalties", id);

    deleteDoc(docRef);
  };

  return (
    <Container>
      {/* Display penalty card */}
      <Card
        elevation={3}
        className={penalty.done ? classes.penalty_card__done : ""}
      >
        <CardHeader
          action={
            // If admin connected, display trash to delete penalty
            auth?.email === process.env.REACT_APP_ADMIN_EMAIL ? (
              <>
                <IconButton onClick={() => handleDeleteSubmit(penalty.id)}>
                  <DeleteOutline />
                </IconButton>
              </>
            ) : (
              ""
            )
          }
          title={
            <Typography
              variant="h6"
              className={
                penalty.done
                  ? classes.penalty_card__checked
                  : classes.penalty_card__link
              }
            >
              Motif : {penalty.motive}
            </Typography>
          }
          subheader={
            penalty.done ? `Acquittée` : `Sentence : ${penalty.number} heouss`
          }
        />
        <CardContent>
          <Typography m="1rem 0" color="textSecondary">
            {penalty.comment}
          </Typography>

          <Typography color="textSecondary">
            {penalty.done
              ? `Date et heure de l'encaissement : ${format(
                  new Date(zonedTimeToUtc(penalty.created_at.toDate())),
                  "d MMMM y H:mm:ss",
                  { locale: fr }
                )}`
              : `Date et heure de l'infraction : ${format(
                  new Date(zonedTimeToUtc(penalty.created_at.toDate())),
                  "d MMMM y H:mm:ss",
                  { locale: fr }
                )}`}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PenaltyCard;
