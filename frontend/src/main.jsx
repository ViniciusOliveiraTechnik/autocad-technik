import "./styles/index.css";

import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";

import React from "react";

import App from "./App";

import Dashboard from "./pages/Dashboard";

import { DashboardProvider } from "./contexts/pages/DashboardContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <DashboardProvider>
            <Dashboard />
          </DashboardProvider>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
