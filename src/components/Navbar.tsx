import { NavLink } from "react-router-dom";

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
        <nav className="shadow-sm shadow-yellow-400 p-2 w-full">
            <div className="md:w-2/5 flex justify-between mx-auto">
                <div>Logo</div>
                <ul className="flex md:gap-8 text-sm">
                    {navItems.map((item, idx) => {
                        return (
                            <NavLink to={item.href} key={idx}>
                                <li>{item.name}</li>
                            </NavLink>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
