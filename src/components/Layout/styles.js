import { makeStyles } from "@mui/styles";

export const drawerWidth = 240;

export default makeStyles((theme) => ({
  layout__appbar: {
    width: `calc(100% - ${drawerWidth}px)!important`,
    [theme.breakpoints.down("sm")]: {
      width: "100%!important",
    },
  },
  layout__toolbar: theme.mixins.toolbar,
  layout__drawer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  layout__drawer_paper: {
    width: drawerWidth,
  },
  layout__menu_icon: {
    color: `${theme.palette.primary.main}!important`,
  },
  layout__link_active: {
    backgroundColor: "#f4f4f4!important",
  },
  layout__menu_burger: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      flexGrow: "1",
    },
  },
  layout__welcome_text: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));
