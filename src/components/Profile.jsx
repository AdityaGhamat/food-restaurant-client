import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MdLocationCity } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
const Profile = () => {
  const { setShowProfile, closeToggle } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="fixed top-0 right-0 w-full md:w-[25vw] h-full bg-sky-100 flex flex-col p-5  ">
      <div className="flex justify-around items-center ">
        <span className="text-2xl font-bold inline-block">My Account</span>
        <IoMdClose
          className="text-xl border border-solid border-black rounded-xl hidden md:block"
          onClick={() => setShowProfile(false)}
        />
      </div>
      <div className="mt-5 text-lg ">
        <ul>
          <Link
            to={"/my-account"}
            className="flex gap-2 items-center border border-solid border-black rounded-lg pl-3 hover:shadow-md"
          >
            <GiShoppingBag />
            <span className="w-full hover:scale-105">Orders</span>
          </Link>
          <Link
            to={"/my-account/address"}
            className="flex gap-2 items-center border border-solid border-black rounded-lg mt-5 pl-3 hover:shadow-md"
          >
            <MdLocationCity />
            <span className="w-full hover:scale-105">Addresses</span>
          </Link>
          <Link
            to={"/my-account/settings"}
            className="flex gap-2 items-center border border-solid border-black rounded-lg mt-5 pl-3 hover:shadow-md"
          >
            <IoMdSettings />
            <span className="w-full hover:scale-105">Settings</span>
          </Link>
          <li
            className="flex gap-2 items-center border border-solid border-black rounded-lg mt-5 pl-3 hover:shadow-md"
            onClick={logout}
          >
            <IoLogOut />
            <span className="w-full hover:scale-105">Logout</span>
          </li>
        </ul>
      </div>
      <div className="m-auto md:hidden">
        <IoMdClose
          className="text-2xl border border-solid border-black rounded-xl"
          onClick={closeToggle}
        />
      </div>
    </div>
  );
};

export default Profile;
