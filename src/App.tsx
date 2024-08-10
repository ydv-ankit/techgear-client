import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import { Navbar } from "./components/Navbar";
import { RouteNotFound } from "./routes/RouteNotFound";
import Dashboard from "./routes/Dashboard";
import Products from "./routes/Products";
import { ThemeProvider } from "./hooks/context/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="overflow-hidden h-screen bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/">
              <Route path="/" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<RouteNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
