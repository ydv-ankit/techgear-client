import { useAppSelector } from "@/hooks/store";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (isAuthenticated) return <Outlet />;
};
