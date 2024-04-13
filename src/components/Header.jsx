import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const [logo, setLogo] = useState("HopeIn");
  const {
    setToggle,
    authuser,
    setShowProfile,
    profileToggle,
    cartToggle,
    address,
    setAddress,
    displayAddress,
    setDisplayAddress,
  } = useContext(AppContext);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setAddress({ Latitude: latitude, Longitude: longitude });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const getAddress = async () => {
    if (address.Latitude !== null && address.Longitude !== null) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${address.Latitude}&lon=${address.Longitude}&format=json`;
      try {
        const response = await axios.get(url);
        setDisplayAddress(response.data.address);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAddress();
  }, [address]);

  useEffect(() => {
    if (
      location.pathname === "/my-account" ||
      location.pathname === "/my-account/settings" ||
      location.pathname === "/my-account/address"
    ) {
      setLogo("My-Account");
    } else {
      setLogo("HopeIn");
    }
  }, [location.pathname]);

  return (
    <header className="mt-3">
      <div className="flex justify-around">
        <ul>
          <h1 className="text-3xl inline-block hover:text-sky-300 transition duration-200">
            {logo}
          </h1>

          {location.pathname === "/" ? (
            <li className="md:block hidden">
              {displayAddress
                ? `${displayAddress.county}, ${displayAddress.state_district}, ${displayAddress.state} ,${displayAddress.postcode}`
                : "your address will be visible here"}
            </li>
          ) : (
            ""
          )}
        </ul>
        <div className="flex gap-5">
          <div className="flex gap-2 items-center transition ease-in-out hover:scale-110">
            <FiSearch className="text-xl" />
            <span className="md:block hidden">Search</span>
          </div>

          <div
            className={`${
              (location.pathname === "/my-account" ||
                location.pathname === "/my-account/settings" ||
                location.pathname === "/my-account/address") &&
              "hidden"
            } flex gap-2 items-center transition ease-in-out hover:scale-110`}
          >
            {!authuser ? (
              <CgProfile className="text-xl" onClick={setToggle} />
            ) : (
              <CgProfile className="text-xl" onClick={profileToggle} />
            )}
            {!authuser ? (
              <span className="md:block hidden" onClick={setToggle}>
                Sign Up
              </span>
            ) : (
              <span
                className="md:block hidden"
                onClick={() => setShowProfile(true)}
              >
                {authuser.name}
              </span>
            )}
          </div>

          <div className="flex gap-2 items-center transition ease-in-out hover:scale-110">
            <FiShoppingBag className="text-xl" onClick={cartToggle} />
            <span className="md:block hidden" onClick={cartToggle}>
              Cart
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
