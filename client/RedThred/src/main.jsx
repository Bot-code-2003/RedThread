import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import Navbar from "./components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Configure the Redux store
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Render the React application
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <GoogleOAuthProvider clientId="mermaid">
      <Provider store={store}>
        <Navbar />
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </Router>
);
