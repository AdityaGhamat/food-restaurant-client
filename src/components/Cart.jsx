import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoMdClose } from "react-icons/io";
import CartItems from "./CartItems";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const { closeToggle, authuser, loginToggle, setCartItems, cartItems } =
    useContext(AppContext);

  const [cart, setCart] = useState(null);
  const [totalQty, setTotalQty] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const getCart = async () => {
    try {
      const response = await axios.get(
        `https://food-restaurant-application-api.onrender.com/api/v1/cart/cartItems/${authuser._id}`
      );
      console.log(response.data.success);
      if (response.data.success) {
        const cart = response.data;
        setCart(cart.cartItems);
        setCartItems(cart.cartItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authuser) {
      getCart();
    }
  }, [authuser]);

  useEffect(() => {
    if (cartItems) {
      const qty = cartItems.reduce(
        (totalQty, item) => totalQty + item.quantity,
        0
      );
      const price = cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      setTotalQty(qty);
      setTotalPrice(price);
    }
  }, [cartItems]);
  const exlorenowHandler = () => {
    closeToggle();
    navigate("/");
  };

  return (
    <div className="fixed top-0 right-0 w-full md:w-[25vw] h-full bg-sky-100 flex flex-col p-5">
      <div className="flex justify-between items-center">
        <span className="text-3xl font-bold">Cart</span>
        <IoMdClose
          className="text-xl border-solid border border-black rounded-lg hover:shadow-md"
          onClick={closeToggle}
        />
      </div>
      <div className="w-full flex flex-col">
        {!authuser ? (
          <>
            <span className="text-xl  w-full text-center font-semibold mt-[30vh]">
              Start Eating by
            </span>
            <h1
              className="text-center text-lg border border-solid border-black rounded-2xl bg-slate-50 text-black hover:bg-slate-300 mt-4"
              onClick={loginToggle}
            >
              Sign up
            </h1>
          </>
        ) : cartItems == 0 || cartItems === null ? (
          <div className="flex flex-col items-center p-2">
            <h1 className="mt-[30vh] text-xl">No Items in the cart</h1>
            <span
              className="border border-solid border-black rounded-xl md:w-[10vw] text-lg text-center p-1 cursor-grab "
              onClick={exlorenowHandler}
            >
              Explore now
            </span>
          </div>
        ) : (
          <div className="mt-5">
            {cartItems ? (
              cartItems.map((item) => (
                <CartItems
                  key={item._id}
                  {...item}
                  setCart={setCart}
                  getCart={getCart}
                  cart={cart}
                />
              ))
            ) : (
              <h1>loading..</h1>
            )}
            <div className="flex flex-col absolute bottom-0 mb-10">
              <span className="text-lg">
                Total Items:{cart ? totalQty : ""}
              </span>
              <span className="text-lg">
                Total Price:{cart ? totalPrice : ""}
              </span>
              <span className="bg-slate-500 font-semibold px-3 py-2 text-center w-[90vw] md:w-[20vw] text-white">
                Order Now
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
