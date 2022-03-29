import * as React from "react";

import {
  onSnapshot,
  collection,
  query,
  orderBy,
  doc,
} from "firebase/firestore";

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

  // Penalty reference
  const penaltyRef = (id) => doc(database, "penalties", id);

  // Order query response
  const q = query(penaltiesCollectionRef, orderBy("created_at", "desc"));

  React.useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setPenalties(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PenaltiesContext.Provider
      value={{ penalties, penaltiesCollectionRef, penaltyRef }}
    >
      {props.children}
    </PenaltiesContext.Provider>
  );
}
