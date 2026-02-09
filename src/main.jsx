import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./context/AuthContext";
import { router } from "./App";

import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";
import "./index.css";

// Force visibility for runtime crashes (helps on Vercel)
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error || e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={2500} />
    </AuthProvider>
  </React.StrictMode>
);
