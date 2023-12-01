import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { AuthProvider } from "./context/FirebaseAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
