import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MainProvider from "./Context/MainProvider.jsx";
import { BrowserRouter } from "react-router-dom";
//changes
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <MainProvider>
      <App />
    </MainProvider>
  </BrowserRouter>
  // </StrictMode>,
);
