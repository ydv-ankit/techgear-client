import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import React, { useEffect } from "react";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/store";
import { logout } from "@/lib/store/features/authSlice";
import { ExitIcon } from "@radix-ui/react-icons";
import { emptyCart } from "@/lib/store/features/cart";

export const Logout = (): React.ReactElement => {
  const { error, requestFunction, responseData } = useAxiosQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    requestFunction({
      urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/logout`,
      method: RequestMethod.DELETE,
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    }
    if (responseData) {
      dispatch(logout());
      dispatch(emptyCart());
      navigate("/");
    }
  }, [error, responseData]);

  return (
    <div
      className="flex items-center justify-center cursor-pointer dark:hover:bg-green-800 p-2 rounded-full"
      onClick={onLogout}
    >
      <ExitIcon />
    </div>
  );
};
