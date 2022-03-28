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
  Menu,
  MenuItem,
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

// Contexts
import { useAuth } from "../../contexts/authContext";

// Layout component to display drawer and appBar
const Layout = ({ children }) => {
  // States for modale
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Hooks
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser: auth, handleLogout } = useAuth();

  // Functions to open and close modale
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to capitalize first letter
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

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
          {/* Burger menu */}
          <Box className={classes.layout__menu_burger}>
            <IconButton
              onClick={handleClick}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/");
                }}
              >
                Accueil
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/heouss");
                }}
              >
                Liste des contraventions
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/heouss/add");
                }}
              >
                Dresser un procès-verbal
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/gallery");
                }}
              >
                Galerie
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("memory-game");
                }}
              >
                Beu Game
              </MenuItem>
            </Menu>
          </Box>
          {/* Welcome text */}
          <Box className={classes.layout__welcome_text} flexGrow="1">
            <PendingPhrase />
          </Box>
          {/* Button Login/Logout */}
          <Box>
            {auth ? (
              <Box display="flex" ml="2rem" alignItems="center">
                {/* Display user name */}
                <Box className={classes.layout__username} mr="1rem">
                  <Typography>
                    Salut, {capitalize(auth?.email.split("@")[0])}
                  </Typography>
                </Box>
                {/* Display user avatar */}
                <Box mr="1rem">
                  <Avatar src={adminAvatarUrl} />
                </Box>
                <Button
                  className={classes.btn__logout}
                  type="submit"
                  variant="outlined"
                  color="inherit"
                  onClick={() => handleLogout()}
                >
                  Déconnexion
                </Button>
              </Box>
            ) : (
              <Button
                className={classes.btn__login}
                type="submit"
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Connexion
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* Left drawer */}
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
      <Box sx={{ width: "100%", margin: "auto" }}>
        {/* Make a space to down children below the toolbar */}
        <Box className={classes.layout__toolbar}></Box>
        <Box
          className={classes.layout__children}
          sx={{
            background: "#f4f4f4",
            height: "100vh",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
