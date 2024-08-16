import React, { useEffect } from "react";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { useAppSelector } from "@/hooks/store";

export const CartIcon = (): React.ReactElement => {
  const { items } = useAppSelector((state) => state.cart);
  const [noOfItems, setNoOfItems] = React.useState(items.length);

  useEffect(() => {
    setNoOfItems(items.length);
  }, [items]);

  return (
    <div className="relative flex items-center justify-center cursor-pointer">
      {noOfItems > 0 && (
        <div className="absolute -top-2 left-3 w-4 h-4 rounded-full bg-lime-800 text-white flex items-center justify-center p-1 text-sm">
          {noOfItems > 9 ? "9+" : noOfItems}
        </div>
      )}
      <ArchiveIcon className="w-5 h-5" />
    </div>
  );
};
