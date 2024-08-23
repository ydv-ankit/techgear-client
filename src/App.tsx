import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import { Navbar } from "./components/Navbar";
import { RouteNotFound } from "./routes/RouteNotFound";
import Dashboard from "./routes/Dashboard";
import { ThemeProvider } from "./hooks/context/theme-provider";
import { Toaster } from "./components/ui/toaster";
import Authentication from "./routes/Authentication";
import SessionProvider from "./SessionProvider";
import { Provider } from "react-redux";
import { store } from "./lib/store/reduxStore";
import Cart from "./routes/Cart";
import Profile from "./routes/Profile";
import NewAddress from "./routes/NewAddress";
import OrderDetails from "./routes/OrderDetails";
import Checkout from "./routes/Checkout";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <div className="overflow-hidden h-screen bg-light-background text-light-text dark:bg-custom-gradient dark:text-dark-text">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/">
                <Route path="/" element={<Home />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="cart" element={<Cart />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/address" element={<NewAddress />} />
                <Route path="order/details" element={<OrderDetails />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="/dashboard">
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Route>
              <Route path="*" element={<RouteNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Toaster />
        <SessionProvider />
      </Provider>
    </ThemeProvider>
  );
}
