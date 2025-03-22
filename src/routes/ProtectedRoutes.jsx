import { useContext } from "react";
import { MainContext } from "../Context/MainProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useContext(MainContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
