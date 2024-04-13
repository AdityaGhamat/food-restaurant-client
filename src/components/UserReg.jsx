import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const UserReg = ({ islogged, SetIsLogged, setFetchToggle }) => {
  //states
  const { setToggle, setRegtoggle, closeToggle } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //handlers

  const AccountHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://food-restaurant-application-api.onrender.com/api/v1/user/${
          !islogged ? "register" : "login"
        }`,
        !islogged ? { name, email, password } : { email, password }
      );
      const { token, message } = response.data;
      toast.success(message);

      localStorage.setItem("token", token);

      if (response.data.success) {
        SetIsLogged(true);
      }
      if (islogged) {
        setRegtoggle(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    AccountHandler();
  }, []);
  return (
    <div className="fixed top-0 right-0 w-full md:w-[25vw] h-full bg-sky-100 flex flex-col p-5 ">
      <div className="flex justify-around mt-2">
        <div className="flex justify-center flex-col  ">
          <h1 className="text-3xl font-bold">
            {!islogged ? "Register" : "Login"}
          </h1>
          {!islogged ? (
            <p>
              <span onClick={() => SetIsLogged(true)}>Or Login</span>
            </p>
          ) : (
            <p>
              <span onClick={() => SetIsLogged(false)}>Or Register</span>
            </p>
          )}
        </div>
        <span onClick={closeToggle}>
          <IoMdClose className="text-lg border border-solid border-black rounded-md mt-2" />
        </span>
      </div>

      <div className="flex flex-col mt-4">
        <form
          onSubmit={AccountHandler}
          className="flex flex-col items-center justify-center w-full"
        >
          {!islogged && (
            <div className="flex gap-2 items-center">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name"
                name="name"
                className="p-1"
              />
            </div>
          )}
          <div className="flex gap-2 items-center mt-2 pl-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              id="email"
              className="p-1"
            />
          </div>

          <div className="flex justify-center items-center gap-2 mt-2 pr-5">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              name="password"
              className="p-1"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white mt-3 p-1 rounded-md"
          >
            {!islogged ? "Create Account" : "Log In"}
          </button>
          <div
            className={`flex justify-center ${
              !islogged ? "p-3" : "pt-3 pl-3 pr-2"
            }  m-0`}
          >
            <p className={`text-sm ${!islogged ? "p-3" : "pt-3 pl-3 pr-2"}`}>
              By clicking on {!islogged ? "Create Account" : "Log In"}, I accept
              the <span className="font-bold">Terms & Conditions</span> &{" "}
              <span className="font-semibold">Privacy Policy</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserReg;
