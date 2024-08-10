import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Orders",
    href: "/orders",
  },
];

export function Navbar() {
  return (
    <nav className="shadow-sm shadow-slate-500 p-2 w-full">
      <div className="md:w-3/5 flex justify-between mx-auto">
        <div>Logo</div>
        <div>
          <ul className="flex md:gap-8 text-sm">
            {navItems.map((item, idx) => {
              return (
                <li className="px-2 py-1" key={idx}>
                  <NavLink to={item.href} className={({ isActive }) => (isActive ? "bg-green-400 rounded-md text-zinc-700 p-2" : "p-2")}>
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
            <ThemeToggle />
          </ul>
        </div>
      </div>
    </nav>
  );
}
