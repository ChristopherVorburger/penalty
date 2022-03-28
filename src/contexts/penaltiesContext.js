import * as React from "react";

import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

import { database } from "../firebase-config";

// Create Authcontexte
export const PenaltiesContext = React.createContext();

// Create custom hook usePenalties
export const usePenalties = () => {
  const context = React.useContext(PenaltiesContext);
  if (!context) {
    throw new Error(
      "usePenalties() only can be used with <PenaltiesContext.provider>"
    );
  }
  return context;
};

// Create context provider
export function PenaltiesContextProvider(props) {
  const [penalties, setPenalties] = React.useState();

  // Collection reference
  const penaltiesCollectionRef = collection(database, "penalties");

  // Order query response
  const q = query(penaltiesCollectionRef, orderBy("created_at", "desc"));
  console.log("Rendu composant");

  React.useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setPenalties(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    console.log("useEffect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PenaltiesContext.Provider value={{ penalties, penaltiesCollectionRef }}>
      {props.children}
    </PenaltiesContext.Provider>
  );
}
