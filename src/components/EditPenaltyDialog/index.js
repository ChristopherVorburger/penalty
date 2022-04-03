import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// Components
import HandIcon from "../../components/_customIcons/HandIcon";

// Firebase
import { updateDoc } from "firebase/firestore";

// Contexts
import { useGlobal } from "../../contexts/globalContext";
import { usePenalties } from "../../contexts/penaltiesContext";
import { useAuth } from "../../contexts/authContext";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

// Reducer edit penalty form
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "TOGGLE_CHECKBOX":
      return {
        ...state,
        [action.payload.key]: action.payload.checked,
        done: !state.done,
      };
    case "CLEAR":
      return {
        motive: "",
        number: "",
        comment: "",
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        motiveError: false,
        numberError: false,
        commentError: false,
      };
    case "MOTIVE_ERROR":
      return {
        ...state,
        motiveError: true,
      };
    case "NUMBER_ERROR":
      return {
        ...state,
        numberError: true,
      };
    case "COMMENT_ERROR":
      return {
        ...state,
        commentError: true,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export default function EditPenaltyDialog() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Using contexts
  const { authUser: auth } = useAuth();
  const { penalties, penaltyRef } = usePenalties();

  // Using global context state to manage the loader, snackbars and edit modal
  const {
    openEditDialog,
    setOpenEditDialog,
    setLoading,
    setOpenSnackbar,
    setSnackbarMessage,
    setSnackbarColor,
  } = useGlobal();

  // Search of penalty who match with the url id param
  const matchedPenalty = penalties.filter((penalty) => {
    return penalty?.id === id;
  });

  const handleClose = () => {
    setOpenEditDialog(false);
    navigate("/penalties");
  };

  // Initial value for the reducer
  const initialValue = {
    motive: matchedPenalty?.[0]?.motive,
    number: matchedPenalty?.[0]?.number,
    comment: matchedPenalty?.[0]?.comment,
    created_at: matchedPenalty?.[0]?.created_at,
    done: matchedPenalty?.[0]?.done,
    motifError: false,
    numberError: false,
    commentError: false,
  };

  // Using reducer
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  // Destructuration values
  const {
    motive,
    number,
    comment,
    created_at,
    done,
    motiveError,
    numberError,
    commentError,
  } = state;

  // Action on input
  const inputAction = (event) => {
    dispatch({
      type: "UPDATE",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  // Action on checkbox
  const checkboxAction = (event) => {
    dispatch({
      type: "TOGGLE_CHECKBOX",
      payload: { key: event.target.name, checked: event.target.checked },
    });
  };

  // Handle edit penalty
  const handleEditPenaltySubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "CLEAR_ERROR" });

    if (!motive || motive.length > 100 || !motive.trim()) {
      dispatch({ type: "MOTIVE_ERROR" });
    } else if (!number || number > 1000 || number < -1000) {
      dispatch({ type: "NUMBER_ERROR" });
    } else if (comment.length > 1000) {
      dispatch({ type: "COMMENT_ERROR" });
    } else {
      setLoading(true);
      if (done === true) {
        updateDoc(penaltyRef(id), {
          motive,
          number: 0,
          comment,
          created_at,
          done,
        })
          .then(() => {
            dispatch({ type: "CLEAR" });
            setLoading(false);
            navigate("/penalties");
            setSnackbarMessage("Contravention modifiée avec succès !");
            setSnackbarColor("success");
            setOpenSnackbar(true);
          })
          .catch(() => {
            setLoading(false);
            setSnackbarMessage("Erreur lors de la modification");
            setSnackbarColor("error");
            setOpenSnackbar(true);
          });
      } else {
        updateDoc(penaltyRef(id), {
          motive,
          number: parseInt(number, 10),
          comment,
          created_at,
          done,
        })
          .then(() => {
            dispatch({ type: "CLEAR" });
            setLoading(false);
            navigate("/penalties");
            setSnackbarMessage("Contravention modifiée avec succès !");
            setSnackbarColor("success");
            setOpenSnackbar(true);
          })
          .catch(() => {
            setLoading(false);
            setSnackbarMessage("Erreur lors de la modification");
            setSnackbarColor("error");
            setOpenSnackbar(true);
          });
      }
    }
  };

  return (
    <Box>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={openEditDialog}
        onClose={handleClose}
      >
        <DialogTitle>Éditer la contravention</DialogTitle>
        <DialogContent>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleEditPenaltySubmit}
          >
            <TextField
              name="motive"
              value={motive}
              onChange={inputAction}
              label="Motif"
              fullWidth
              required
              multiline
              rows={2}
              error={motiveError}
              helperText={
                motiveError &&
                "Le motif est obligatoire (100 caractères maximum)"
              }
              margin="normal"
            />
            <TextField
              name="number"
              value={number}
              onChange={inputAction}
              type="number"
              label="Sentence"
              required
              error={numberError}
              helperText={
                numberError &&
                "La sentence doit être un nombre d'heouss compris entre -1000 et 1000"
              }
              margin="normal"
              disabled={done}
            />

            <TextField
              name="comment"
              value={comment}
              onChange={inputAction}
              label="Commentaire"
              fullWidth
              multiline
              rows={4}
              error={commentError}
              helperText={
                commentError &&
                "Le commentaire ne doit pas dépasser 1000 caractères"
              }
              margin="normal"
            />
            <FormControlLabel
              label="Acquitter le heouss ?"
              sx={{ width: "100%" }}
              control={
                <Checkbox
                  name="done"
                  checked={done}
                  onChange={checkboxAction}
                />
              }
            />
            {!auth ? (
              <Typography color="error">Veuillez vous connecter</Typography>
            ) : (
              <Button
                type="submit"
                variant="outlined"
                endIcon={<HandIcon />}
                sx={{ textTransform: "none", mt: "1rem" }}
              >
                Confirmer les modifications
              </Button>
            )}
          </form>
          <Button
            variant="outlined"
            color="error"
            sx={{ textTransform: "none", mt: "1rem" }}
            onClick={handleClose}
          >
            Annuler
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
