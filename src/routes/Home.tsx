import { ProductCard } from "@/components/ProductCard";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
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
  if (loading)
    return (
      <div className="w-screen h-screen overflow-hidden">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="text-red-700 flex flex-col gap-4 items-center justify-center w-screen h-screen md:text-3xl">
        {error}
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 p-4 gap-4 overflow-auto h-full">
      {responseData && responseData.data.length === 0 && (
        <div className="text-center md:text-2xl">No products to show</div>
      )}
      {responseData &&
        responseData.data.map((product: ProductData, idx: number) => (
          <ProductCard data={product} key={idx} />
        ))}
    </div>
  );
}
