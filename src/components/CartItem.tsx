import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { remove } from "@/lib/store/features/cart";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export const CartItems = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const onRemove = (id: string) => {
    dispatch(remove(id));
  };
  return (
    <div className="flex flex-col items-center">
      {items.length === 0 && (
        <div className="text-center text-lg mt-4">
          <div>No items in cart</div>
          <NavLink to={"/"}>
            <Button className="mt-4">Go to Home</Button>
          </NavLink>
        </div>
      )}
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
                    "",
                  )}
                >
                  {"$ "}
                  {item.price}
                </div>
                {item.discount > 0 && (
                  <div>
                    {"$ "}
                    {parseFloat(
                      (
                        item.price -
                        (item.discount * item.price) / 100
                      ).toString(),
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
      {items.length > 0 && (
        <div className="flex flex-col">
          <div>
            <h3 className="text-lg">
              {"Total Items: "}
              {items.length}
            </h3>
            <div className="text-xl">
              {"Total Price: $ "}
              {items
                .reduce(
                  (acc, item) =>
                    acc +
                    (item.discount > 0
                      ? item.price - (item.discount * item.price) / 100
                      : item.price),
                  0,
                )
                .toFixed(2)}
            </div>
          </div>
          <NavLink to={"/checkout"}>
            <Button className="mt-4">Checkout</Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};
