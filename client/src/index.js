import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateContextProvider } from "./contexts/StateContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { CustomizesContextProvider } from "./contexts/CustomizesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StateContextProvider>
        <CustomizesContextProvider>
          <App />
        </CustomizesContextProvider>
      </StateContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
