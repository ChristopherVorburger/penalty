import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MUI components
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

// MUI icons
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CollectionsIcon from "@mui/icons-material/Collections";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MenuIcon from "@mui/icons-material/Menu";

// Import styles
import useStyles, { drawerWidth } from "./styles";
import PendingPhrase from "../PendingPhrase";
import { adminAvatarUrl } from "../../utils/helpers";

// Layout component to display drawer and appBar
const Layout = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  // Items to display drawer
  const menuItems = [
    { text: "Accueil", icon: <HomeIcon />, path: "/" },
    {
      text: "Listes des contraventions",
      icon: <ViewListIcon />,
      path: "/heouss",
    },
    {
      text: "Dresser un procès-verbal",
      icon: <PlaylistAddIcon />,
      path: "/heouss/add",
    },
    { text: "Galerie", icon: <CollectionsIcon />, path: "/gallery" },
    { text: "Beu Game", icon: <SportsEsportsIcon />, path: "/game" },
  ];
  return (
    <Box display="flex">
      <AppBar className={classes.layout__appbar} elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box className={classes.layout__menu_burger}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box className={classes.layout__welcome_text} flexGrow="1">
            <PendingPhrase />
          </Box>
          <Box display="flex" ml="2rem" alignItems="center">
            <Box mr="1rem">
              <Typography>Hello, Name</Typography>
            </Box>
            <Box mr="1rem">
              <Avatar src={adminAvatarUrl} />
            </Box>
            <Box>
              <Button variant="outlined" color="inherit">
                Button
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.layout__drawer}
        sx={{ width: drawerWidth }}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.layout__drawer_paper }}
      >
        <List>
          {menuItems.map((item) => {
            return (
              <ListItem
                key={item.text}
                onClick={() => navigate(`${item.path}`)}
                className={
                  location.pathname === item.path
                    ? classes.layout__link_active
                    : null
                }
                button={true}
                sx={{ p: "1rem" }}
              >
                <ListItemIcon classes={{ root: classes.layout__menu_icon }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box>
        {/* Make a space to down children below the toolbar */}
        <Box className={classes.layout__toolbar}></Box>
        <Box sx={{ background: "#E5E1E6", width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
