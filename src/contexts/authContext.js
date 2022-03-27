import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Import firebase/auth function getAuth()
import { auth } from "../firebase-config";

// Create Authentification context
export const AuthContext = React.createContext();

// Create useAuth hook to use the context in the app
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() s'utilise avec <AuthContext.provider>");
  }
  return context;
};

// Reducer for login form
const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "clear":
      return {
        email: "",
        password: "",
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Create context provider
export function AuthContextProvider(props) {
  const navigate = useNavigate();

  // Initials values of the reducer
  const initialValue = {
    email: "",
    password: "",
  };

  // Use reducer
  const [state, dispatch] = React.useReducer(reducer, initialValue);
  
  // Destructuring value
  const { email, password } = state;

  // Input action
  const inputAction = (event) => {
    dispatch({
      type: "update",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  // Function to login user
  const handleLogin = (event) => {
    event.preventDefault();
    if (!email || !password) {
      console.log("erreur champs vide");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch({ type: "clear" });
        navigate("/");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          console.log("error", error.message);
        }
      });
  };

  // Function to logout user
  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => console.log("error.message", error.message));
  };

  // State for current authenticate user
  const [authUser, setAuthUser] = React.useState();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthUser(currentUser);
      return unsubscribe;
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        authUser,
        email,
        password,
        inputAction,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
