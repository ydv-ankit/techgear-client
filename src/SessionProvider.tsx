import { useEffect } from "react";
import { useAppDispatch } from "./hooks/store";
import axios from "axios";
import { login } from "./lib/store/features/authSlice";
import { toast } from "./components/ui/use-toast";

export default function SessionProvider(): null {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (() => {
      axios({
        method: "GET",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/refresh`,
        withCredentials: true,
      })
        .then((res) => {
          const user = res.data.data;
          dispatch(
            login({
              id: user.id,
              email: user.email,
              name: user.name,
              avatar: user.avatar,
            }),
          );
          return;
        })
        .catch((err) => {
          if (
            err.response.status === 401 &&
            window.location.pathname !== "/auth"
          ) {
            toast({
              title: "Error",
              description: "Login required",
            });
          }
          return;
        });
    })();
    return () => {};
  }, [dispatch]);
  return null;
}
