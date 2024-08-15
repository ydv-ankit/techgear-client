import { AddProductForm } from "@/components/AddProductForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

enum Tab {
  OVERVIEW,
  PRODUCTS,
  ORDERS,
}

type tabsType = {
  label: string;
  action: Tab;
};

const tabs: tabsType[] = [
  {
    label: "Overview",
    action: Tab.OVERVIEW,
  },
  {
    label: "Products",
    action: Tab.PRODUCTS,
  },
  {
    label: "Orders",
    action: Tab.ORDERS,
  },
];

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.OVERVIEW);

  return (
    <div className="flex flex-1 h-full">
      <div className="flex flex-col items-center w-64 pt-4 mb-2 border-r dark:border-dark-component">
        <div className="flex w-full p-4">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="profile"
            className="w-12 ring-1 ring-white rounded-full"
          />
          <div className="flex flex-col ml-4">
            <span className="text-dark-text">Full name</span>
            <span className="text-dark-text/50 text-sm">email@id.com</span>
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
      <div className="flex-1 dark:bg-dark-background bg-slate-300 border-t border-t-dark-component p-2">
        <AddProductForm />
      </div>
    </div>
  );
}
