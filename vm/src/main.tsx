import { Root } from "@/interface/pages/Root";
import React from "react";
import ReactDOM from "react-dom/client";
import "@/interface/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VendingMachine } from "@/interface/pages/VendingMachine";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/vm",
    element: <VendingMachine />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
