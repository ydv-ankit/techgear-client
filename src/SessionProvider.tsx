import { useEffect } from "react";
import { useAppDispatch } from "./hooks/store";
import axios from "axios";
import { login } from "./lib/store/features/authSlice";

export default function SessionProvider(): null {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (() => {
      console.log("logging");

      axios({
        method: "GET",
        url: `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/refresh`,
        withCredentials: true,
      })
        .then((res) => {
          const user = res.data.data;
          dispatch(login({ id: user.id, email: user.email, name: user.name }));
          return;
        })
        .catch(() => {
          return;
        });
    })();
    return () => {};
  }, [dispatch]);
  return null;
}
