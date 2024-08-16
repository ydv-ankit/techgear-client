import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import React, { useEffect } from "react";
import { ProductTable } from "./ProductTable";

export default function Products(): React.ReactElement {
  const { error, loading, requestFunction, responseData } = useAxiosQuery();

  useEffect(() => {
    requestFunction({
      urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/product/all`,
      method: RequestMethod.GET,
    });
  }, []);

  return (
    <div className="h-full overflow-auto w-full pb-10">
      {error && <div className="dark:text-white">{error}</div>}
      {loading && <div className="dark:text-white">Loading...</div>}
      {responseData && <ProductTable data={responseData.data} />}
    </div>
  );
}
