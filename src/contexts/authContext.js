import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Import firebase/auth function getAuth()
import { auth } from "../firebase-config";

// Import global context
import { useGlobal } from "../contexts/globalContext";

// Create Authentification context
export const AuthContext = React.createContext();

// Create useAuth hook to use the context in the app
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() only can be used with <AuthContext.provider>");
  }
  return context;
};

// Reducer for login form
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "CLEAR":
      return {
        email: "",
        password: "",
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        emptyFieldError: false,
        authError: false,
      };
    case "EMPTY_FIELD_ERROR":
      return {
        ...state,
        emptyFieldError: true,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        authError: true,
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
    emptyFieldError: false,
    authError: false,
  };

  // Use reducer
  const [state, dispatch] = React.useReducer(reducer, initialValue);

  // Destructuring values
  const { email, password, emptyFieldError, authError } = state;

  // Using global context state to manage the loader
  const { setLoading } = useGlobal();

  // Input action
  const inputAction = (event) => {
    dispatch({
      type: "UPDATE",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  // Function to login user
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch({ type: "CLEAR_ERROR" });
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      dispatch({ type: "EMPTY_FIELD_ERROR" });
      return;
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          dispatch({ type: "CLEAR" });
          setLoading(false);
          navigate("/");
        })
        .catch(() => {
          setLoading(false);
          dispatch({ type: "AUTH_ERROR" });
        });
    }
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
        inputAction,
        authUser,
        email,
        password,
        emptyFieldError,
        authError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
