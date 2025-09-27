import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import useAuthUser from "../hooks/useAuthUser";

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { authUser, isLoading, isAdmin } = useAuthUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
