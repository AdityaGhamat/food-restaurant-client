import React, { useContext } from "react";
import Cart from "../Cart";
import { AppContext } from "../../context/AppContext";
import VerticleMenu from "./VerticleMenu";
const AccOrders = () => {
  const { showCart } = useContext(AppContext);
  return (
    <div className="flex justify-center ">
      <div className="bg-slate-300 lg:h-[80vh] h-[90vh] w-full lg:w-[80%] lg:mt-10 flex mt-2">
        <VerticleMenu />
        order
      </div>
      {showCart ? <Cart /> : ""}
    </div>
  );
};

export default AccOrders;
