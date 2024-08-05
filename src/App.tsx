import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import { Navbar } from "./components/Navbar";
import { RouteNotFound } from "./routes/RouteNotFound";

const router = createBrowserRouter([
    {
        path: "",
        element: <Navbar />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
        errorElement: <RouteNotFound />,
    },
]);
export default function App() {
    return (
        <div>
            {/* <Navbar /> */}
            <RouterProvider router={router} />
        </div>
    );
}
