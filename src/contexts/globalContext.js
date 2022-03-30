import * as React from "react";

// Create GlobalContext
export const GlobalContext = React.createContext();

// Create hook useGlobal
export const useGlobal = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobal() only can be used with <GlobalContext.provider>"
    );
  }
  return context;
};

// Create context provider
export function GlobalContextProvider(props) {
  const [loading, setLoading] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  return (
    <GlobalContext.Provider
      value={{ loading, setLoading, openEditDialog, setOpenEditDialog }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
