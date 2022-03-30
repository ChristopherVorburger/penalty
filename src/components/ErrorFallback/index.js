import { useNavigate } from "react-router-dom";

// MUI
import { Box, Button, Typography } from "@mui/material";

// Components
import HandIcon from "../_customIcons/HandIcon";

// Error FallBack for Error Boundary
function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    resetErrorBoundary();
  };
  return (
    <Box display="flex" justifyContent="center">
      <Box mt="2rem">
        <Typography variant="h6">Une erreur est survenue</Typography>
        <pre style={{ color: "red", fontSize: "1em" }}>
          Erreur : {error.message}
        </pre>

        <Box display="flex" alignItems="center">
          <Box>
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{ textTransform: "none" }}
            >
              Retour à l'accueil
            </Button>
          </Box>
          <Box>
            <HandIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ErrorFallback;
