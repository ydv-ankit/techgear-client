import { UserOrder } from "@/types/user";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export const Order = ({ order }: { order: UserOrder }) => {
  return (
    <div className="flex md:flex-row flex-col border p-2 rounded-md gap-4">
      <div className="flex flex-col">
        <div className="flex">
          <div className="font-bold">Order ID:</div>
          <div className="mx-2">{order?.id}</div>
        </div>
        <div className="flex">
          <div className="font-bold">Total Price:</div>
          <div className="mx-2">{order?.payment_price}</div>
        </div>
        <div className="flex">
          <div className="font-bold">Ordered At:</div>
          <div className="mx-2">
            {new Date(order?.order_time).toDateString()}
            {", "}
            {new Date(order?.order_time).toLocaleTimeString()}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-end gap-2">
        <div className="flex">
          <div className="font-bold">Payment Status</div>
          <div
            className={cn(
              order?.payment_status === "SUCCESS"
                ? "bg-green-800"
                : "bg-violet-500",
              "p-1 rounded-md mx-2 text-sm font-bold text-white",
            )}
          >
            {order?.payment_status}
          </div>
        </div>
        <NavLink to={`/order/details?id=${order?.id}`} className="w-full">
          <Button className="w-full dark:bg-blue-400 dark:text-white">
            Details
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
