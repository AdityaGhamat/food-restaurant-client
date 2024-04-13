import React, { useContext, useEffect, useState } from "react";
import UserReg from "./UserReg";
import { AppContext } from "../context/AppContext";
import FoodCard from "./FoodCard";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import Cart from "./Cart";

const Hero = () => {
  const {
    regtoggle,
    foodData,
    setAuthUser,
    showProfile,
    showCart,
    authuser,
    islogged,
    SetIsLogged,
    fetchtoggle,
    setFetchToggle,
  } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            `http://localhost:8000/api/v1/user/get-user`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",

                Authorization: `${token}`,
              },
            }
          );
          const data = await response.json();

          if (data.success) {
            setAuthUser(data.user);
          } else {
            setError(data.message);
            setUser(null);
          }
        }
      } catch (error) {
        setError(error.message);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:mr-[10vw] md:ml-[10vw] gap-3 mt-7 rounded-sm">
        {foodData && foodData.menuItems !== null ? (
          foodData.menuItems.map((item, index) => (
            <Link to={`/foodpage/${item._id}`} key={index}>
              <FoodCard item={item} />
            </Link>
          ))
        ) : (
          <h1>Loading..</h1>
        )}
      </div>
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
    </>
  );
};

export default Hero;
