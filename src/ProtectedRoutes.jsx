import { useAuth } from "./context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) return <p className="text-xl">Loading...</p>;

  if (!isAuth && isLoading === false) return <Navigate to={"/"} replace />;

  return (
    <>
      <section className="bg-input-gray flex flex-col gap-4 w-fit max-w-96 rounded-3xl min-h-screen font-custom shadow-lg mx-auto overflow-hidden">
        <Outlet />
      </section>
    </>
  );
};

export default ProtectedRoutes;
