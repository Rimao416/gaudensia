import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { OverlayProvider } from "./context/OverlayContext";
import { AuthOverlayProvider } from "./context/AuthOverlayContext.tsx";
import "react-phone-number-input/style.css";
import { MessageProvider } from "./context/NotificationContext.tsx";
import "./i18n.ts"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthOverlayProvider>
          <OverlayProvider>
            <MessageProvider>
              <App />
            </MessageProvider>
          </OverlayProvider>
        </AuthOverlayProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
