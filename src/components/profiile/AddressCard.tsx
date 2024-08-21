import { UserAddressType } from "@/types/user";
import { Button } from "../ui/button";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { NavLink } from "react-router-dom";

export const AddressCard = ({ address }: { address: UserAddressType }) => {
  const { error, loading, requestFunction, responseData } = useAxiosQuery();
  const [isDeleted, setIsDeleted] = useState(false);

  const onAddressDelete = () => {
    requestFunction({
      urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/address/${address.id}`,
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
      setIsDeleted(true);
    }
  }, [error, responseData]);

  if (isDeleted) return null;

  return (
    <div className="max-w-[800px] min-w-[600px] border border-blue-600 p-1 rounded-md">
      <div className="px-2 flex w-full gap-2">
        <div className="min-w-fit font-bold">Address Line 1 :</div>
        <div className="">{address.address_line_1}</div>
      </div>
      <div className="px-2 flex w-full gap-2">
        <div className="min-w-fit font-bold">Address Line 2 :</div>
        <div className="">{address.address_line_2}</div>
      </div>
      <div className="px-2 flex w-full gap-2">
        <div className="min-w-fit font-bold">Street Name :</div>
        <div className="">{address.street_name}</div>
      </div>
      <div className="px-2 flex w-full gap-2">
        <div className="min-w-fit font-bold">City :</div>
        <div className="">{address.city}</div>
      </div>
      <div className="px-2 flex w-full gap-2">
        <div className="min-w-fit font-bold">Postal Code :</div>
        <div className="">{address.postal_code}</div>
      </div>
      <div className="px-2 flex w-full gap-2">
        <div className="min-w-fit font-bold">County :</div>
        <div className="">{address.country}</div>
      </div>
      <div className="flex justify-end gap-4 mt-2">
        <NavLink to={`/profile/address?type=edit&id=${address.id}`}>
          <Button className="dark:bg-blue-800 dark:text-white">Edit</Button>
        </NavLink>
        <Button
          className="dark:bg-red-600 dark:text-white"
          onClick={onAddressDelete}
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
