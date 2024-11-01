import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { OverlayProvider } from "./context/OverlayContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <OverlayProvider>
          <App />
        </OverlayProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
