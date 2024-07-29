import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Grid } from "@mui/material";

import { Link } from "react-router-dom";

import reducers from "./reducers";
import App from "./App";
import "./index.css";
import Navbar from "./components/Navbar";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Thunk usefull for async actions.
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Provider store={store}>
        <Navbar />

        <App />
      </Provider>
    </GoogleOAuthProvider>
  </Router>
);
