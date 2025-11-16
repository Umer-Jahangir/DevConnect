import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Lingo.dev Compiler runtime wrapper
import { LingoProviderWrapper, loadDictionary } from "lingo.dev/react/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LingoProviderWrapper loadDictionary={(locale) => loadDictionary(locale)}>
      <App />
    </LingoProviderWrapper>
  </StrictMode>
);
