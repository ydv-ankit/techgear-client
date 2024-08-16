import { ProductData } from "@/types/product";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export const ProductCard = ({
  data,
}: {
  data: ProductData;
}): React.ReactElement => {
  return (
    <div className="sm:flex-1 border border-slate-600 flex flex-col justify-between p-2 rounded-sm h-[400px] gap-1 dark:bg-dark-component">
      <div className="w-full h-56 rounded-lg overflow-hidden">
        <img
          src={data.image}
          alt="product_image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex gap-3">
          <div
            className={cn(
              data.discount > 0
                ? "line-through text-sm text-slate-400"
                : "text-white",
              "",
            )}
          >
            {"$ "}
            {data.price}
          </div>
          {data.discount > 0 && (
            <div>
              {"$ "}
              {data.price - (data.discount * data.price) / 100}
            </div>
          )}
        </div>
        <div className="font-bold">{data.name}</div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>
              {index < data.rating ? (
                <StarFilledIcon className="w-4 h-4 text-yellow-500" />
              ) : (
                <StarIcon className="w-4 h-4 text-slate-300" />
              )}
            </span>
          ))}
        </div>
        <Button className="my-2 dark:text-white dark:bg-dark-selected dark:hover:bg-dark-selected/80">
          Add to cart
        </Button>
      </div>
    </div>
  );
};
