import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MainProvider from "./Context/MainProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <MainProvider>
        <App />
      </MainProvider>
    </Provider>
  </BrowserRouter>
  // </StrictMode>,
);
