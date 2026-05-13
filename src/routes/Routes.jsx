import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import Transactions from "../pages/Transactions";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../components/dashboard/DashboardHome";

const router = createBrowserRouter([

  //* PUBLIC ROUTES
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/transactions", element: <Transactions /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ]
  },

  //* DASHBOARD ROUTES — no navbar, no footer
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },

])

export default router