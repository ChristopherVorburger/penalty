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
    "6.25%": {
      transform: "rotate(90deg) translateY(-1px)",
    },
    "12.5%": {
      transform: "rotate(90deg) translateY(-2px)",
    },
    "25%": {
      transform: "rotate(90deg) translateY(-3px)",
    },
    "31.25%": {
      transform: "rotate(90deg) translateY(-4px)",
    },
    "37.5%": {
      transform: "rotate(90deg) translateY(-5px)",
    },
    "43.75%": {
      transform: "rotate(90deg) translateY(-6px)",
    },
    "50%": {
      transform: "rotate(90deg) translateY(-7px)",
    },
    "62.5%": {
      transform: "rotate(90deg) translateY(-6px)",
    },
    "68.75%": {
      transform: "rotate(90deg) translateY(-5px)",
    },
    "75%": {
      transform: "rotate(90deg) translateY(-4px)",
    },
    "81.25%": {
      transform: "rotate(90deg) translateY(-3px)",
    },
    "87.5%": {
      transform: "rotate(90deg) translateY(-2px)",
    },
    "93.75%": {
      transform: "rotate(90deg) translateY(-1px)",
    },
    "100%": {
      transform: "rotate(90deg) translateY(0px)",
    },
  },
}));
