import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// MUI
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import HandIcon from "../_customIcons/HandIcon";

// Date fns
import { zonedTimeToUtc } from "date-fns-tz";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Firebase
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../firebase-config";

// Context
import { useAuth } from "../../contexts/authContext";
import { useGlobal } from "../../contexts/globalContext";

// Styles
import useStyles from "./styles";
import { Box } from "@mui/system";

const PenaltyCard = ({ penalty }) => {
  console.log("penalty", penalty);
  const classes = useStyles();
  const navigate = useNavigate();
  const { setLoading } = useGlobal();
  const { authUser: auth } = useAuth();
  const {
    setOpenEditDialog,
    setOpenSnackbar,
    setSnackbarMessage,
    setSnackbarColor,
  } = useGlobal();

  // Handle delete penalty submit
  const handleDeleteSubmit = (id) => {
    const docRef = doc(database, "penalties", id);
    setLoading(true);
    deleteDoc(docRef)
      .then(() => {
        setLoading(false);
        setSnackbarMessage("Contravention supprimée avec succès !");
        setSnackbarColor("success");
        setOpenSnackbar(true);
      })
      .catch((err) => {
        setLoading(false);
        setSnackbarMessage("Erreur lors de la suppression");
        setSnackbarColor("error");
        setOpenSnackbar(true);
      });
  };

  return (
    <Card
      elevation={2}
      className={penalty?.done ? classes.penalty_card__done : ""}
    >
      <CardHeader
        action={
          auth?.email === process.env.REACT_APP_ADMIN_EMAIL ? (
            <>
              <IconButton
                onClick={() => {
                  return (
                    setOpenEditDialog(true),
                    navigate(`/penalties/${penalty?.id} `)
                  );
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteSubmit(penalty?.id)}>
                <DeleteOutline />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={() => {
                return (
                  setOpenEditDialog(true),
                  navigate(`/penalties/${penalty?.id} `)
                );
              }}
            >
              <EditIcon />
            </IconButton>
          )
        }
        title={
          <Typography
            variant="h6"
            sx={{ overflowWrap: "anywhere" }}
            className={
              penalty?.done
                ? classes.penalty_card__checked
                : classes.penalty_card
            }
          >
            Motif : {penalty?.motive}
          </Typography>
        }
        subheader={
          penalty?.done ? (
            <Typography>Acquittée</Typography>
          ) : (
            <Box display="flex" alignItems="center">
              <Typography>Sentence : {penalty?.number} heouss</Typography>
              <HandIcon />
            </Box>
          )
        }
      />
      <CardContent>
        <Typography
          sx={{ overflowWrap: "anywhere" }}
          mb="1rem"
          color="textSecondary"
        >
          {penalty?.comment}
        </Typography>

        {penalty?.created_at !== null && (
          <Typography color="textSecondary">
            {penalty?.done
              ? `Date et heure de l'encaissement : ${format(
                  new Date(zonedTimeToUtc(penalty?.created_at?.toDate())),
                  "d MMMM y HH:mm:ss",
                  { locale: fr }
                )}`
              : `Date et heure de l'infraction : ${format(
                  new Date(zonedTimeToUtc(penalty?.created_at?.toDate())),
                  "d MMMM y HH:mm:ss",
                  { locale: fr }
                )}`}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

PenaltyCard.propTypes = {
  penalty: PropTypes.shape({
    id: PropTypes.string.isRequired,
    motive: PropTypes.string.isRequired,
    created_at: PropTypes.shape({
      nanoseconds: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired,
    }),
    done: PropTypes.bool.isRequired,
    number: PropTypes.number.isRequired,
    comment: PropTypes.string,
  }),
};

export default PenaltyCard;
