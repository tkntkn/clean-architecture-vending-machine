import { Root } from "@/interface/pages/Root";
import React from "react";
import ReactDOM from "react-dom/client";
import "@/interface/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
