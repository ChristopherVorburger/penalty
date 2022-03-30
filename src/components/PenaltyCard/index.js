import React from "react";
import { useNavigate } from "react-router-dom";

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
  const classes = useStyles();
  const navigate = useNavigate();
  const { setLoading } = useGlobal();
  const { authUser: auth } = useAuth();
  const { setOpenEditDialog } = useGlobal();

  // Handle delete penalty submit
  const handleDeleteSubmit = (id) => {
    const docRef = doc(database, "penalties", id);
    setLoading(true);
    deleteDoc(docRef)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
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

        {/* {penalty?.created_at !== null && ( */}
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
        {/* )} */}
      </CardContent>
    </Card>
  );
};

export default PenaltyCard;
