import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  icon__hand: {
    transform: "rotate(90deg) ",
    color: "pink",
    animation: `$myEffect 0.8s infinite ease`,
    fontSize: "2rem!important",
  },
  "@keyframes myEffect": {
    "0%": {
      transform: "rotate(90deg) translateY(0)",
    },
    "5%": {
      transform: "rotate(90deg) translateY(-1px)",
    },
    "10%": {
      transform: "rotate(90deg) translateY(-2px)",
    },
    "15%": {
      transform: "rotate(90deg) translateY(-3px)",
    },
    "20%": {
      transform: "rotate(90deg) translateY(-4px)",
    },
    "25%": {
      transform: "rotate(90deg) translateY(-5px)",
    },
    "30%": {
      transform: "rotate(90deg) translateY(-6px)",
    },
    "35%": {
      transform: "rotate(90deg) translateY(-7px)",
    },
    "40%": {
      transform: "rotate(90deg) translateY(-8px)",
    },
    "45%": {
      transform: "rotate(90deg) translateY(-9px)",
    },
    "50%": {
      transform: "rotate(90deg) translateY(-10px)",
    },
    "55%": {
      transform: "rotate(90deg) translateY(-9px)",
    },
    "60%": {
      transform: "rotate(90deg) translateY(-8px)",
    },
    "65%": {
      transform: "rotate(90deg) translateY(-7px)",
    },
    "70%": {
      transform: "rotate(90deg) translateY(-6px)",
    },
    "75%": {
      transform: "rotate(90deg) translateY(-5px)",
    },
    "80%": {
      transform: "rotate(90deg) translateY(-4px)",
    },
    "85%": {
      transform: "rotate(90deg) translateY(-3px)",
    },
    "90%": {
      transform: "rotate(90deg) translateY(-2px)",
    },
    "95%": {
      transform: "rotate(90deg) translateY(-1px)",
    },
    "100%": {
      transform: "rotate(90deg) translateY(0px)",
    },
  },
}));
