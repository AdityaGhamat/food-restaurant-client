import React from "react";
import { IoBagSharp } from "react-icons/io5";
import { MdLocationCity } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
const VerticleMenu = () => {
  return (
    <div className="lg:h-[80vh] h-[90vh] w-[18vw] bg-slate-500 ">
      <ul>
        <span
          className={`flex gap-2 ${
            location.pathname === "/my-account" && "bg-slate-300"
          } lg:text-xl justify-center items-center h-[8vh]`}
        >
          <IoBagSharp className="hidden lg:block" />
          <Link className="hover:scale-110 cursor-pointer" to={"/my-account"}>
            Orders
          </Link>
        </span>
        <span
          className={`flex gap-2 ${
            location.pathname === "/my-account/address" && "bg-slate-300"
          } lg:text-xl justify-center items-center h-[8vh]`}
        >
          <MdLocationCity className="hidden lg:block" />
          <Link
            className="hover:scale-110 cursor-pointer"
            to={"/my-account/address"}
          >
            Address
          </Link>
        </span>
        <span
          className={`flex gap-2 ${
            location.pathname === "/my-account/settings" && "bg-slate-300"
          } lg:text-xl justify-center items-center h-[8vh]`}
        >
          <IoMdSettings className="hidden lg:block" />
          <Link
            className="hover:scale-110 cursor-pointer"
            to={"/my-account/settings"}
          >
            Settings
          </Link>
        </span>
      </ul>
    </div>
  );
};

export default VerticleMenu;
