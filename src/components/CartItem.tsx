import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { remove } from "@/lib/store/features/cart";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "./ui/use-toast";
import { ProductData } from "@/types/product";

export const CartItems = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { error, requestFunction } = useAxiosQuery();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // Memoize the total price calculation
  const totalPrice = useMemo(() => {
    const total = items.reduce(
      (acc, item) =>
        acc +
        (item.discount > 0
          ? item.price - (item.discount * item.price) / 100
          : item.price),
      0,
    );
    return parseFloat(total as unknown as string).toFixed(2);
  }, [items]);

  const onCreateOrder = async () => {
    setLoading(true);
    const products = items.map((item: ProductData) => item.name);
    const orderPayload = {
      total_price: totalPrice,
      products,
    };
    try {
      const responseData = await requestFunction({
        urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/order`,
        method: RequestMethod.POST,
        headers: {
          "Content-Type": "application/json",
        },
        data: orderPayload,
      });
      const redirectLink = responseData?.data.data.link;
      if (redirectLink) {
        window.location = redirectLink;
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred while creating the order.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onRemove = (id: string) => {
    dispatch(remove(id));
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    }
  }, [error]);

  if (items.length === 0) {
    return (
      <div className="text-center text-lg mt-4">
        <div>No items in cart</div>
        <NavLink to={"/"}>
          <Button className="mt-4">Go to Home</Button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between p-2 dark:bg-dark-component md:w-3/5 w-full m-2 rounded-lg"
        >
          <div className="flex">
            <div className="m-1 rounded-lg overflow-hidden w-14 h-14">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="line-clamp-2">{item.name}</h3>
              <div className="flex gap-2 my-2">
                <div
                  className={cn(
                    item.discount > 0
                      ? "line-through text-sm text-slate-400"
                      : "text-white",
                  )}
                >
                  {"$ "}
                  {item.price}
                </div>
                {item.discount > 0 && (
                  <div>
                    {"$ "}
                    {parseFloat(
                      (item.price - (item.discount * item.price) / 100).toFixed(
                        2,
                      ),
                    ).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Button
              className="text-sm dark:bg-red-600 dark:text-white"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="flex flex-col">
        <div>
          <h3 className="text-lg">Total Items: {items.length}</h3>
          <div className="text-xl">Total Price: $ {totalPrice}</div>
        </div>
        <Button className="mt-4" onClick={onCreateOrder} disabled={loading}>
          Checkout
        </Button>
      </div>
    </div>
  );
};
