import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import RouteError from "./pages/errors/RouteError";
import NotFound from "./pages/errors/NotFound";

// Pages
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import CustomerList from "./pages/customers/CustomerList";
import CustomerForm from "./pages/customers/CustomerForm";
import CustomerDetails from "./pages/customers/CustomerDetails";
import MeasurementList from "./pages/measurements/MeasurementList";
import MeasurementForm from "./pages/measurements/MeasurementForm";
import OrderList from "./pages/orders/OrderList";
import OrderForm from "./pages/orders/OrderForm";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <RouteError />,
  },

  {
    element: <ProtectedRoute />,
    errorElement: <RouteError />,
    children: [
      { path: "/", element: <Dashboard /> },

      { path: "/customers", element: <CustomerList /> },
      { path: "/customers/new", element: <CustomerForm /> },
      { path: "/customers/:id", element: <CustomerDetails /> },

      // Measurements
      { path: "/customers/:id/measurements", element: <MeasurementList /> },
      { path: "/customers/:id/measurements/new", element: <MeasurementForm /> },

      // Orders
      { path: "/customers/:id/orders", element: <OrderList /> },
      { path: "/orders/new", element: <OrderForm /> },


      // Catch-all 404 inside protected area
      { path: "*", element: <NotFound /> },
    ],
  },
]);
