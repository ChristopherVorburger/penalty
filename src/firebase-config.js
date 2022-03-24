// Import function to initialize Firebase
import { initializeApp } from "firebase/app";

// Import function to get authentification
import { getAuth } from "firebase/auth";

// Import function to get firestore
import { getFirestore } from "@firebase/firestore";

// Import function to get storage
import { getStorage } from "firebase/storage";

// Database configuration
const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
} = process.env;

// Firebase config
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create authentification reference
export const auth = getAuth();

// Create firestore reference
export const database = getFirestore();

// Create storage reference
export const storage = getStorage(firebaseApp);
