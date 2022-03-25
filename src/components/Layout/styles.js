import { makeStyles } from "@mui/styles";

export const drawerWidth = 240;

export default makeStyles((theme) => ({
  layout__appbar: {
    width: `calc(100% - ${drawerWidth}px)!important`,
  },
  layout__toolbar: theme.mixins.toolbar,
  layout__drawerPaper: {
    width: drawerWidth,
  },
  layout__menuIcon: {
    color: `${theme.palette.primary.main}!important`,
  },
  layout__link_active: {
    backgroundColor: "#f4f4f4!important",
  },
}));
