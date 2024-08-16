import { useEffect } from "react";
import { useAppDispatch } from "./hooks/store";
import axios from "axios";

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
          dispatch({ type: "auth", payload: res?.data?.data });
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
