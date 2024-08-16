import { ProductCard } from "@/components/ProductCard";
import { toast } from "@/components/ui/use-toast";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { ProductData } from "@/types/product";
import React, { useEffect } from "react";

export default function Home(): React.ReactElement {
  const { error, loading, requestFunction, responseData } = useAxiosQuery();

  useEffect(() => {
    requestFunction({
      urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/product/all`,
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
  }, [error, responseData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 p-4 gap-2 overflow-auto h-full">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {responseData &&
        responseData.data.map((product: ProductData, idx: number) => (
          <ProductCard data={product} key={idx} />
        ))}
    </div>
  );
}
