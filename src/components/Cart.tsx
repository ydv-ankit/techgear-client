import React from "react";
import { ArchiveIcon } from "@radix-ui/react-icons";

export const CartItem = (): React.ReactElement => {
  return (
    <div className="flex items-center justify-center cursor-pointer">
      <ArchiveIcon className="w-5 h-5" />
    </div>
  );
};
