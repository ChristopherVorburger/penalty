import { BrowserRouter as Router } from "react-router-dom";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Context
import { GlobalContextProvider } from "./globalContext";
import { AuthContextProvider } from "./authContext";
import { PenaltiesContextProvider } from "./penaltiesContext";

// Theme MUI
const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

const AppProviders = ({ children }) => {
  return (
    <Router>
      <GlobalContextProvider>
        <ThemeProvider theme={theme}>
          <PenaltiesContextProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </PenaltiesContextProvider>
        </ThemeProvider>
      </GlobalContextProvider>
    </Router>
  );
};

export { AppProviders };
