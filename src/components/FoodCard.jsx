import axios from "axios";
import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const FoodCard = ({ item }) => {
  const shortDesc = item.description.split(" ").slice(0, 10).join(" ");
  const { authuser, setCartItems, getCart } = useContext(AppContext);

  const addTocart = async (e) => {
    e.preventDefault();
    const { _id, itemName, price, rating, imageUrl, quantity } = item;
    if (authuser) {
      const { _id: userId } = authuser;
      try {
        const response = await axios.post(
          `https://food-restaurant-application-api.onrender.com/api/v1/cart/add-to-cart/${userId}`,
          {
            id: _id,
            name: itemName,
            price,
            rating,
            image: imageUrl,
            quantity,
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          setCartItems(response.data.cartItems);

          getCart();
        }
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
    if (!authuser) {
      toast.error("You need to sign in");
    }
  };

  return (
    <div className="md:w-full w-[70%] m-[auto] p-5 flex flex-col gap-2 bg-white border border-solid">
      <img
        src={item.imageUrl}
        alt="food-item"
        className="w-auto h-[130px] object-cover cursor-grab transform hover:scale-105 transition duration-500"
      />
      <div className="flex justify-between">
        <h2>{item.itemName}</h2>
        <span>₹{item.price}</span>
      </div>
      <p className="text-sm">{shortDesc}...</p>
      <div className="flex justify-between items-center">
        <span className="flex items-center">
          <FaStar /> {item.ratings}
        </span>
        <button
          className="px-3 py-1 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition duration-300 bottom-5 right-5"
          onClick={addTocart}
          onMouseDown={(e) => e.preventDefault()}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
