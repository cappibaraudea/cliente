import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Tasks from "./pages/Tasks.jsx";
import Layout from "./pages/Layout.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { TasksProvider } from "./context/tasksContext.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import { TaskForm } from "./pages/TaskForm.jsx";
import Feed from "./pages/Feed.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/posts",
        element: <Tasks />,
      },
      {
        path: "/taskForm/:id",
        element: <TaskForm />,
      },
      {
        path: "/add-task",
        element: <TaskForm />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <TasksProvider>
        <RouterProvider router={router}></RouterProvider>
      </TasksProvider>
    </AuthProvider>
  </React.StrictMode>
);
