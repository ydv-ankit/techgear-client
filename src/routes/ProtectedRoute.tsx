import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/store";
import { Outlet } from "react-router-dom";
import Authentication from "./Authentication";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (!isAuthenticated) {
    toast({
      title: "Error",
      description: "Login Required",
    });
    return <Authentication />;
  }
  if (isAuthenticated) return <Outlet />;
};
