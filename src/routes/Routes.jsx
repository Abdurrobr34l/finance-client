import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import Transactions from "../pages/Transactions";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },

      //* Private
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      //* Private
      
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ]
  }
])

export default router