import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  gallery__form: {
    textAlign: "-webkit-center",
    border: "1px solid #2196f3",
    borderRadius: "1rem",
    width: "50%",
    padding: "1rem",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  gallery__field: {
    display: "block!important",
    margin: "2rem!important",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  gallery__send_button: {
    display: "block!important",
    width: "20%",
    marginBottom: "1rem!important",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  },
}));
