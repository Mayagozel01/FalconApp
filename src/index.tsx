import "helpers/initFA.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import Main from "./Main.tsx";

createRoot(document.getElementById("main")!).render(
  <StrictMode>
    <Main>
      <App />
    </Main>
  </StrictMode>
);
