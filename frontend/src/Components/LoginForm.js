import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase.config";
import SocialComponent from "./SocialComponent";

function LoginForm() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [erorMessage, setErrorMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!(userDetails.email && userDetails.password)) {
      setErrorMessage("All fields Are Required.");
      return;
    } else {
      setErrorMessage("");
    }
    console.log(userDetails);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    try {
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="pt-20 md:pt-0">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <h1 className="block text-lg mt-3  text-gray-700 text-center font-semibold">
              Silico Note App
            </h1>
            <h1 className="block text-lg mt-3  text-gray-700 text-center font-semibold">
              Login
            </h1>
            <form
              method="post"
              onSubmit={submitHandler}
              encType="multipart/form-data"
              className="mt-10"
            >
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-4"
                  name="email"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                />
              </div>

              <div className="mt-7">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg pl-4"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                />
              </div>

              <div className="mt-7">
                <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Login
                </button>
              </div>
              <h4 className="text-sm font-semibold mt-2 text-red-600 text-center">
                {erorMessage}
              </h4>
              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <label className="block font-medium text-sm text-gray-600 w-full">
                  Login Option
                </label>
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>

              <SocialComponent />

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">Don't Have Account ?</label>
                  <NavLink
                    to="/register"
                    className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Sign Up
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
