import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { PAYMENT_STATUS } from "@/types/user";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Checkout() {
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const urlQuery = new URLSearchParams(useLocation().search);
  const { error, requestFunction } = useAxiosQuery();
  const [loading, setLoading] = useState<boolean>(false);
  const paymentToken = urlQuery.get("token");

  useEffect(() => {
    setLoading(true);
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
        requestFunction({
          urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/${paymentToken}`,
          method: RequestMethod.PUT,
          data: {
            payment_status: PAYMENT_STATUS.SUCCESS,
          },
        });
      } else if (orderDetails?.data.status === "PAYER_ACTION_REQUIRED") {
        setOrderStatus("Payment not completed");
      }
    })();
    setLoading(false);
  }, [paymentToken]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    }
  }, [error]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold mt-4">Order Status</h1>
      <div className="flex flex-col gap-2 items-center">
        <div className="font-bold">
          {orderStatus === "SUCCESS" ? (
            <div className="text-xl text-green-500">
              <div>Success...</div>
              Thank you for ordering !
            </div>
          ) : orderStatus === "PENDING" ? (
            <div className="text-xl text-red-600">Order failed !</div>
          ) : (
            <div className="text-xl text-red-600">{orderStatus}</div>
          )}
        </div>
        <NavLink to={"/"}>
          <Button>Homepage</Button>
        </NavLink>
      </div>
    </div>
  );
}
