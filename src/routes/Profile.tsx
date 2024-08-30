import { AddressCard } from "@/components/profile/AddressCard";
import { Order } from "@/components/profile/Order";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/store";
import { RequestMethod, useAxiosQuery } from "@/hooks/useAxiosQuery";
import { cn } from "@/lib/utils";
import { UserAddressType, UserOrder } from "@/types/user";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

enum UserTabs {
  Addresses = "Addresses",
  Orders = "Orders",
}

export default function Profile(): React.ReactElement {
  const { error, requestFunction, responseData } = useAxiosQuery();
  const { user } = useAppSelector((state) => state.auth);

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
    <div className="h-screen dark:bg-custom-gradient-2 flex md:flex-row flex-col">
      <div className="w-full md:w-96 h-full dark:bg-blue-900 bg-white">
        <div className="flex flex-col gap-2 items-center py-4">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white">
            <img src={user?.avatar} alt="profile" />
          </div>
          <span className="text-xl font-bold">{user?.name}</span>
          <span className="text-sm lowercase">{user?.email}</span>
        </div>
        <div className="flex flex-col items-center gap-2 w-full justify-center">
          <Button
            className={cn(
              activeTab === UserTabs.Addresses
                ? "dark:bg-dark-selected dark:text-white dark:hover:bg-dark-selected"
                : "",
              "w-[90%] max-w-60",
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
              "w-[90%] max-w-60",
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
