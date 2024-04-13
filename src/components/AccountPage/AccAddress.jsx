import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Cart from "../Cart";
import VerticleMenu from "./VerticleMenu";
import axios from "axios";
const AccAddress = () => {
  const { showCart, authuser, accAddress } = useContext(AppContext);
  const [straightAddress, setStraightAddress] = useState("");

  const addressChanageHandler = (e) => {
    setStraightAddress(e.target.value);
  };
  const addressSubmitHandler = async (e) => {
    e.preventDefault();
    if (authuser) {
      try {
        const response = await axios.post(
          `https://food-restaurant-application-api.onrender.com/api/v1/user-address/address/${authuser._id}`,
          { straightAddress }
        );
        const returnResponse = response.data;
        console.log(returnResponse);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-slate-300 lg:h-[80vh] h-[90vh] w-full lg:w-[80%] lg:mt-10 flex ">
        <div className="inline-block">
          <VerticleMenu />
        </div>
        <div className="mt-2 ml-2 lg:ml-[1vw]">
          <form onSubmit={addressSubmitHandler}>
            <input
              type="text"
              onChange={addressChanageHandler}
              placeholder="Enter your address"
              value={straightAddress}
              className="pl-1"
            />
            <button
              type="submit"
              className="ml-2 border border-soild rounded-lg border-black p-[2px]"
            >
              Add
            </button>
          </form>
        </div>
        <div></div>
      </div>

      {showCart ? <Cart /> : ""}
    </div>
  );
};

export default AccAddress;
