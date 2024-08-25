import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";
import { UserOrder } from "@/types/user";
import { Order } from "./Order";
import { Spinner } from "../Spinner";

export const Orders = () => {
  const { error, loading, requestFunction, responseData } = useAxiosQuery();
  useEffect(() => {
    requestFunction({
      urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/all`,
      method: RequestMethod.GET,
    });
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    }
  }, [error]);

  if (loading) return <Spinner />;
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-center md:text-xl underline underline-offset-2">
        All Orders
      </h1>
      <div className="flex flex-wrap">
        {responseData &&
          responseData.data.map((order: UserOrder) => (
            <Order key={order?.id} order={order} />
          ))}
      </div>
    </div>
  );
};
