import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import React, { useEffect } from "react";
import { toast } from "../ui/use-toast";
import { ProductData } from "@/types/product";

export const ProductTable = ({
  data,
}: {
  data: ProductData[];
}): React.ReactElement => {
  const { error, loading, requestFunction, responseData } = useAxiosQuery();
  console.log(error, loading, responseData);

  const onDelete = (id: string) => {
    requestFunction({
      urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/product/${id}`,
      method: RequestMethod.DELETE,
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
      });
    }
    if (responseData) {
      toast({
        title: "Success",
        description: responseData.message,
      });
    }
  }, [error, responseData]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="dark:text-slate-200 w-[90px]">
            Item No
          </TableHead>
          <TableHead className="dark:text-slate-200 w-[100px]">Id</TableHead>
          <TableHead className="dark:text-slate-200">Product Name</TableHead>
          <TableHead className="dark:text-slate-200">Price</TableHead>
          <TableHead className="dark:text-slate-200">Discount</TableHead>
          <TableHead className="dark:text-slate-200">Image</TableHead>
          <TableHead className="dark:text-slate-200">Rating</TableHead>
          <TableHead className="dark:text-slate-200 text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product: ProductData, idx: number) => (
          <TableRow key={idx}>
            <TableCell className="hover:underline cursor-pointer font-medium">
              {idx + 1}
            </TableCell>
            <TableCell className="hover:underline cursor-pointer font-medium text-nowrap">
              {product.id}
            </TableCell>
            <TableCell className="hover:underline cursor-pointer">
              {product.name}
            </TableCell>
            <TableCell className="hover:underline cursor-pointer">
              {product.price}
            </TableCell>
            <TableCell className="hover:underline cursor-pointer">
              {product.discount}
            </TableCell>
            <TableCell className="hover:underline cursor-pointer w-9">
              {product.image}
            </TableCell>
            <TableCell className="hover:underline cursor-pointer">
              {product.rating}
            </TableCell>
            <TableCell onClick={() => onDelete(product.id)}>Delete</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
