import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Profile from "../components/Profile";
import Cart from "../components/Cart";
import UserReg from "../components/UserReg";
import toast from "react-hot-toast";
const FoodPage = () => {
  const { id } = useParams();
  const {
    regtoggle,
    setCartItems,
    showProfile,
    showCart,
    authuser,
    islogged,
    SetIsLogged,
    setFetchToggle,
    getCart,
  } = useContext(AppContext);
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFood = async () => {
    try {
      const response = await axios.get(
        `https://food-restaurant-application-api.onrender.com/api/v1/product/menuitems/${id}`
      );
      setFoodItem(response.data.item);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!foodItem) {
    return <div>Food item not found</div>;
  }

  const {
    category,
    createdAt,
    description,
    imageUrl,
    ingredients,
    itemName,
    price,
    ratings,
    updatedAt,
  } = foodItem;
  const addTocart = async (e) => {
    e.preventDefault();
    const { _id, itemName, price, rating, imageUrl, quantity } = foodItem;
    if (authuser) {
      const { _id: userId } = authuser;
      try {
        const response = await axios.post(
          `http://localhost:8000/api/v1/cart/add-to-cart/${userId}`,
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
    <main className="lg:max-w-[70vw] mx-auto p-8 lg:flex flex-col lg:flex-row justify-center overflow-hidden sm:m-auto">
      <section className="hero mb-8 lg:w-[450px] w-[300px] mt-[10vh]">
        <img src={imageUrl} alt={itemName} className="w-full rounded-lg" />
        <h1 className="text-xl font-bold text-center mt-4">{itemName}</h1>
      </section>
      <section className="food-details card p-4 rounded-lg shadow-md lg:w-[500px] w-[300px]">
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2 hidden lg:block">
            Description:
          </h2>
          <p className="text-gray-600 hidden lg:block">{description}</p>
        </section>
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Details:</h2>
          <ul className="grid grid-cols-2 gap-4 text-gray-700">
            <li>Category: {category}</li>
            <li>Price: ₹{price}</li>
            <li>Ratings: {ratings}</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Ingredients:</h2>
          <ul className="list-disc ml-4 text-gray-600">
            {ingredients && ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <li>No ingredients listed</li>
            )}
          </ul>
        </section>
        <button className="btn btn-primary w-full" onClick={addTocart}>
          Add to cart
        </button>
      </section>
      <div>
        {regtoggle ? (
          <UserReg
            islogged={islogged}
            SetIsLogged={SetIsLogged}
            setFetchToggle={setFetchToggle}
          />
        ) : showProfile ? (
          <Profile />
        ) : showCart ? (
          <Cart />
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default FoodPage;
