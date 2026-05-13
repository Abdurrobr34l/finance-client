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
import AboutUs from "../pages/AboutUs";
import ErrorPage from "../pages/ErrorPages/ErrorPage404";

const router = createBrowserRouter([

  //* PUBLIC ROUTES
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "pricing", element: <Pricing /> },
      { path: "transactions", element: <Transactions /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <ErrorPage /> },
    ]
  },

  //* DASHBOARD ROUTES
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },

  //* Global error page catch-all
  {
    path: "*",
    element: <ErrorPage />,
  },
])

export default router