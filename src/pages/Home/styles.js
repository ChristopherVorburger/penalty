import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  home__container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "90vh",
  },
  home__phrase: {
    marginBottom: "2rem!important",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  home__button_submit: {
    transition: "all .2s ease-in-out!important",
    fontSize: "1.5rem!important",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem!important",
    },

    "&:hover": {
      transition: "all .2s ease-in-out",
      transform: "scale(1.1)",
    },
  },
  home__icon_hand: {
    transform: "rotate(90deg)",
    color: "pink",
    fontSize: "2rem!important",
  },
  home__images: {
    margin: "auto",
  },
  home__image_police: {
    width: "400px",
    height: "400px",
    [theme.breakpoints.down("md")]: {
      width: "200px",
      height: "200px",
    },
  },
}));
