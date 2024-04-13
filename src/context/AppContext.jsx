import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [regtoggle, setRegtoggle] = useState(false);
  const [foodData, setFoodData] = useState(null);
  const [authuser, setAuthUser] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [islogged, SetIsLogged] = useState(false);
  const [fetchtoggle, setFetchToggle] = useState(false);

  const setToggle = () => {
    if (regtoggle) {
      setRegtoggle(false);
    } else {
      setRegtoggle(true);
    }
  };
  //food-card-fetching
  const getFood = async () => {
    const food = await axios.get(
      "https://food-restaurant-application-api.onrender.com/api/v1/product/search"
    );
    const foodData = food.data;
    setFoodData(foodData);
  };
  useEffect(() => {
    getFood();
  }, []);
  const cartToggle = () => {
    setShowCart(true);
    setShowProfile(false);
    setRegtoggle(false);
  };
  const closeToggle = () => {
    setShowCart(false);
    setShowProfile(false);
    setRegtoggle(false);
  };
  const profileToggle = () => {
    setShowCart(false);
    setShowProfile(true);
    setRegtoggle(false);
  };
  const loginToggle = () => {
    setShowCart(false);
    setShowCart(false);
    setRegtoggle(true);
  };
  const getCart = async () => {
    try {
      const response = await axios.get(
        `https://food-restaurant-application-api.onrender.com/api/v1/cart/cartItems/${authuser._id}`
      );

      if (response.data.success) {
        const cartItems = response.data.cartItems;
        setCartItems(cartItems);
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
  const [address, setAddress] = useState({
    Latitude: null,
    Longitude: null,
  });
  const [displayAddress, setDisplayAddress] = useState(undefined);
  const [accAddress, setAccAddress] = useState(null);
  const getAddressUser = async () => {
    if (authuser) {
      try {
        const response = await axios.get(
          `https://food-restaurant-application-api.onrender.com/api/v1/user-address/getaddress/${authuser._id}`
        );

        setAccAddress(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAddressUser();
  }, []);
  const value = {
    regtoggle,
    setRegtoggle,
    setToggle,
    setFoodData,
    foodData,
    authuser,
    setAuthUser,
    showProfile,
    setShowProfile,
    showCart,
    cartToggle,
    profileToggle,
    closeToggle,
    loginToggle,
    cartItems,
    setCartItems,
    getCart,
    address,
    setAddress,
    displayAddress,
    setDisplayAddress,
    islogged,
    SetIsLogged,
    fetchtoggle,
    setFetchToggle,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
