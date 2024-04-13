import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AccSettings from "./components/AccountPage/AccSettings";
import AccAddress from "./components/AccountPage/AccAddress";
import AccOrders from "./components/AccountPage/AccOrders";

const Layout = lazy(() => import("./pages/Layout"));
const Hero = lazy(() => import("./components/Hero"));
const FoodPage = lazy(() => import("./pages/FoodPage"));
const Account = lazy(() => import("./pages/Account"));
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading ...</h1>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Hero />} />
            <Route path="/foodpage/:id" element={<FoodPage />} />
          </Route>
          <Route path="/my-account" element={<Account />}>
            <Route index element={<AccOrders />} />
            <Route path="settings" element={<AccSettings />} />
            <Route path="address" element={<AccAddress />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
