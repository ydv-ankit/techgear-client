import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { cn } from "@/lib/utils";
import { PAYMENT_STATUS, UserOrder } from "@/types/user";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderDetails() {
  const urlQuery = new URLSearchParams(useLocation().search);
  const { error, loading, requestFunction, responseData } = useAxiosQuery();
  const [order, setOrder] = useState<UserOrder | null>(null);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    requestFunction({
      urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/order/${urlQuery.get("id")}`,
      method: RequestMethod.GET,
    });
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
      goBack();
    }
    if (responseData) {
      setOrder(responseData.data);
    }
  }, [error, responseData]);
  if (error) return;
  if (loading) return <Spinner />;
  if (order)
    return (
      <div className="flex flex-col items-center h-[93dvh] overflow-y-scroll">
        <h1 className="font-bold text-3xl my-2 underline">Order Details</h1>
        <div className="mt-4 space-y-2">
          <div className="flex gap-2 text-xl">
            <div className="font-bold">Order ID:</div>
            <div>{order?.id}</div>
          </div>
          <div className="flex gap-2 text-xl">
            <div className="font-bold">Transaction ID:</div>
            <div>{order?.payment_id}</div>
          </div>
          <div className="flex gap-2 text-xl">
            <div className="font-bold">Total Price:</div>
            <div>{order?.payment_price}</div>
          </div>
          <div className="flex gap-2 text-xl flex-col">
            <div className="font-bold">Products</div>
            <div>
              {order?.products?.length! > 0 ? (
                <ul className="pl-4 text-lg">
                  {order?.products.map((product: string, idx: number) => (
                    <li key={idx} className="ml-6 max-w-96 list-decimal mb-2">
                      {product}
                    </li>
                  ))}
                </ul>
              ) : (
                "No product"
              )}
            </div>
          </div>
          <div className="flex gap-2 text-xl">
            <div className="font-bold">Ordered At:</div>
            <div>
              {new Date(order!.order_time).toDateString()}
              {", "}
              {new Date(order!.order_time).toLocaleTimeString()}
            </div>
          </div>
          <div className="flex gap-2 text-xl">
            <div className="font-bold">Payment Status</div>
            <div
              className={cn(
                order?.payment_status === PAYMENT_STATUS.PENDING
                  ? "bg-violet-500"
                  : "bg-green-800",
                "p-1 rounded-md text-sm",
              )}
            >
              {order?.payment_status}
            </div>
          </div>
          <Button className="w-full max-w-60" onClick={() => goBack()}>
            Go Back
          </Button>
        </div>
      </div>
    );
}
