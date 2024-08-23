import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Checkout() {
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const urlQuery = new URLSearchParams(useLocation().search);
  const { error, loading, requestFunction } = useAxiosQuery();
  const paymentToken = urlQuery.get("token");

  useEffect(() => {
    (async () => {
      const username = import.meta.env.VITE_PAYPAL_AUTH_TOKEN_USERNAME;
      const password = import.meta.env.VITE_PAYPAL_AUTH_TOKEN_PASSWORD;
      const credentials = btoa(`${username}:${password}`);
      const responseData = await requestFunction({
        urlPath: `${import.meta.env.VITE_PAYPAL_URL}/v1/oauth2/token`,
        method: RequestMethod.POST,
        headers: {
          Authorization: `BASIC ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: false,
        data: new URLSearchParams({
          grant_type: "client_credentials",
        }).toString(),
      });
      const accessToken = responseData?.data.access_token;
      const orderDetails = await requestFunction({
        urlPath: `${import.meta.env.VITE_PAYPAL_URL}/v2/checkout/orders/${paymentToken}`,
        method: RequestMethod.GET,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: false,
      });
      if (orderDetails?.data.status === "APPROVED") {
        setOrderStatus("SUCCESS");
      }
    })();
  }, [paymentToken]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    }
  }, [error]);

  if (loading) return;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold mt-4">Order Status</h1>
      <div className="flex flex-col gap-2 items-center">
        <div className="font-bold">
          {orderStatus === "SUCCESS" ? (
            <div className="text-xl text-green-500">
              Thank you for ordering !
            </div>
          ) : (
            <div className="text-xl text-red-600">Order failed !</div>
          )}
        </div>
        <NavLink to={"/"}>
          <Button>Homepage</Button>
        </NavLink>
      </div>
    </div>
  );
}
