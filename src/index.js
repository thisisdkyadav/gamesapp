import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
// import {createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from './pages/Home';
// import Login from './pages/Login';

// const router = createBrowserRouter([
//   {path: "/", element: <Home />},
//   {path: "/login", element: <Login />},
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <RouterProvider router={router} />
  <App />
)
