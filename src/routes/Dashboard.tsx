import { AddProductForm } from "@/components/dashboard/AddProductForm";
import { Orders } from "@/components/dashboard/Orders";
import Products from "@/components/dashboard/Products";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/store";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

enum Tab {
  PRODUCTS,
  ADDPRODUCT,
  ORDERS,
}

type tabsType = {
  label: string;
  action: Tab;
};

const tabs: tabsType[] = [
  {
    label: "Products",
    action: Tab.PRODUCTS,
  },
  {
    label: "Orders",
    action: Tab.ORDERS,
  },
  {
    label: "Add Product",
    action: Tab.ADDPRODUCT,
  },
];

export default function Dashboard(): React.ReactElement {
  const { user } = useAppSelector((state) => state.auth);

  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.PRODUCTS);

  return (
    <div className="flex flex-1 h-full">
      <div className="flex flex-col items-center w-1/6 pt-4 mb-2 border-r dark:border-dark-component">
        <div className="flex w-full p-4">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="profile"
            className="w-12 ring-1 ring-white rounded-full"
          />
          <div className="flex flex-col ml-4">
            <span className="text-dark-text">{user?.name}</span>
            <span className="text-dark-text/50 text-sm">{user?.email}</span>
          </div>
        </div>
        <div className="w-full">
          {tabs.map((tab, idx) => (
            <Button
              key={idx}
              className={cn(
                "w-full rounded-none mb-1 dark:bg-transparent dark:text-white dark:hover:bg-dark-selected/20",
                selectedTab === tab.action
                  ? "dark:bg-dark-selected dark:hover:bg-dark-selected"
                  : "",
              )}
              onClick={() => setSelectedTab(tab.action)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="dark:bg-dark-background bg-slate-300 border-t border-t-dark-component p-2 w-5/6">
        {selectedTab === Tab.PRODUCTS && <Products />}
        {selectedTab === Tab.ADDPRODUCT && <AddProductForm />}
        {selectedTab === Tab.ORDERS && <Orders />}
      </div>
    </div>
  );
}
