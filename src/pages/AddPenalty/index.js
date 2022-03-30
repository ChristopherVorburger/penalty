import React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import { Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Components
import HandIcon from "../../components/_customIcons/HandIcon";

// Firestore
import { addDoc, serverTimestamp } from "firebase/firestore";

// Contexts
import { useAuth } from "../../contexts/authContext";
import { usePenalties } from "../../contexts/penaltiesContext";
import { useGlobal } from "../../contexts/globalContext";

// Styles
import useStyles from "./styles";

// Reducer add penalty form
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
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

const NewHeouss = () => {
  // Hooks
  const classes = useStyles();
  const navigate = useNavigate();
  const { penaltiesCollectionRef } = usePenalties();
  const { authUser: auth } = useAuth();

  // Initial value for the reducer
  const initialValue = {
    motive: "",
    number: "",
    comment: "",
    motifError: false,
    numberError: false,
    commentError: false,
  };

  // Using reducer
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  // Destructuration values
  const { motive, number, comment, motiveError, numberError, commentError } =
    state;

  // Action on input
  const inputAction = (event) => {
    dispatch({
      type: "UPDATE",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  // Using global context state to manage the loader
  const { setLoading } = useGlobal();

  // Handle add new penalty
  const handleAddSubmit = (e) => {
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
      addDoc(penaltiesCollectionRef, {
        motive,
        number: parseInt(number, 10),
        comment,
        created_at: serverTimestamp(),
        done: false,
      })
        .then(() => {
          dispatch({ type: "CLEAR" });
          setLoading(false);
          navigate("/penalties");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
        });
    }
  };

  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleAddSubmit}>
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
            motiveError && "Le motif est obligatoire (100 caractères maximum)"
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
        {!auth ? (
          <Typography color="error">Veuillez vous connecter</Typography>
        ) : (
          <Button
            type="submit"
            variant="outlined"
            className={classes.add_penalty__button_submit}
            endIcon={<HandIcon />}
            sx={{ textTransform: "none", mt: "1rem" }}
          >
            Valider le procès-verbal
          </Button>
        )}
      </form>
    </Container>
  );
};

export default NewHeouss;
