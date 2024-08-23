import { AddressCard } from "@/components/profiile/AddressCard";
import { Order } from "@/components/profiile/Order";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { cn } from "@/lib/utils";
import { UserAddressType, UserOrder } from "@/types/user";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

enum UserTabs {
  Addresses = "Addresses",
  Orders = "Orders",
}

export default function Profile() {
  const { error, requestFunction, responseData } = useAxiosQuery();

  const [activeTab, setActiveTab] = useState<UserTabs>(UserTabs.Addresses);
  const [addresses, setAddresses] = useState<UserAddressType[]>([]);
  const [orders, setOrders] = useState<UserOrder[]>([]);

  useEffect(() => {
    if (activeTab === UserTabs.Addresses) {
      requestFunction({
        urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/address`,
        method: RequestMethod.GET,
      });
    } else if (activeTab === UserTabs.Orders) {
      requestFunction({
        urlPath: `${import.meta.env.VITE_SERVER_URL}/api/v1/order`,
        method: RequestMethod.GET,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (error) {
      toast({
        title: "error",
        description: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (responseData) {
      activeTab === UserTabs.Addresses && setAddresses(responseData.data);
      activeTab === UserTabs.Orders && setOrders(responseData.data);
    }
  }, [responseData]);

  return (
    <div className="h-screen dark:bg-custom-gradient-2 flex">
      <div className="w-96 h-full dark:bg-blue-900 bg-white">
        <div className="flex flex-col gap-2 items-center py-4">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white">
            <img
              src="data:image/jpeg;base64,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"
              alt="profile"
            />
          </div>
          <span className="text-xl font-bold">Full name</span>
          <span className="text-sm lowercase">EMIAL@mail.com</span>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          <Button
            className={cn(
              activeTab === UserTabs.Addresses
                ? "dark:bg-dark-selected dark:text-white dark:hover:bg-dark-selected"
                : "",
              "w-[90%]",
            )}
            onClick={() => setActiveTab(UserTabs.Addresses)}
          >
            Addresses
          </Button>
          <Button
            className={cn(
              activeTab === UserTabs.Orders
                ? "dark:bg-dark-selected dark:text-white dark:hover:bg-dark-selected"
                : "",
              "w-[90%]",
            )}
            onClick={() => setActiveTab(UserTabs.Orders)}
          >
            Orders
          </Button>
        </div>
      </div>
      <div className="w-full p-2">
        {activeTab === UserTabs.Addresses &&
          (addresses.length > 0 ? (
            <div className="w-full flex flex-col items-center py-4 h-full overflow-hidden">
              <h2 className="font-bold md:text-xl border-b w-full m-2 text-center">
                Saved Addresses
              </h2>
              <div className="w-full flex flex-wrap max-h-full overflow-scroll gap-4">
                {addresses.map((address) => (
                  <AddressCard key={address.id} address={address} />
                ))}
              </div>
              <div className="w-full">
                <NavLink to="/profile/address?type=new">
                  <Button className="w-fit">Add Address</Button>
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 mt-4">
              <span className="md:text-xl">No addresses found</span>
              <NavLink to="/profile/address?type=new">
                <Button className="w-fit">Add Address</Button>
              </NavLink>
            </div>
          ))}
        {activeTab === UserTabs.Orders &&
          (orders.length > 0 ? (
            <div className="w-full flex flex-col items-center py-4 h-full overflow-hidden">
              <h2 className="font-bold md:text-xl border-b w-full m-2 text-center">
                Order Details
              </h2>
              <div className="w-full flex flex-wrap max-h-full overflow-scroll gap-4">
                {orders.map((order: UserOrder, idx: number) => (
                  <Order key={idx} order={order} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 mt-4">
              <span className="md:text-xl">No Orders</span>
            </div>
          ))}
      </div>
    </div>
  );
}
