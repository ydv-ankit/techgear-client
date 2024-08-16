import { Button } from "@/components/ui/button";
import React from "react";
import { NavLink } from "react-router-dom";

export function RouteNotFound(): React.ReactElement {
  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-50% left-50% text-9xl md:text-[490px] text-gray-600">
        404
      </div>
      <div className="z-10 flex flex-col justify-center items-center gap-4">
        <span className="text-3xl md:text-8xl text-gray-400">
          Page Not Found
        </span>
      </div>
      <NavLink to="/" className="absolute bottom-20">
        <Button>Homepage</Button>
      </NavLink>
    </div>
  );
}
