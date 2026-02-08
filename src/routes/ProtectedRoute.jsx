import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/ui/Loader";

const ProtectedRoute = () => {
  const { user, booting } = useAuth();
  const location = useLocation();

  if (booting) return <Loader />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
