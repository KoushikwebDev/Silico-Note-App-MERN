import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SocialComponent from "./SocialComponent";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

function Registerform() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [erorMessage, setErrorMessage] = useState("");

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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!(userDetails.name && userDetails.email && userDetails.password)) {
      setErrorMessage("All fields Are Required.");
      return;
    } else {
      setErrorMessage("");
    }
    console.log(userDetails);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      if (user !== null) {
        await updateProfile(user, {
          displayName: userDetails.name,
        });
      }

      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center pt-10 md:pt-0 md:justify-center px-2 ">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-4 text-xl font-semibold text-center">
            Silico Note App
          </h1>

          <h1 className="mb-8 text-xl font-semibold text-center">Sign up</h1>
          <form
            onSubmit={submitHandler}
            method="post"
            encType="multipart/form-data"
          >
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="firstName"
              placeholder="Name"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              title="Please fill proper email."
              pattern="\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b"
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              title="Please enter a strong password including all character."
              // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$"
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline lg:tracking-wider  block mx-auto"
              type="submit"
            >
              Create Account
            </button>
          </form>
          <h4 className="text-sm font-semibold mt-2 text-red-600 text-center">
            {erorMessage}
          </h4>
          <div className="flex mt-3 items-center text-center">
            <hr className="border-gray-300 border-1 w-full rounded-md" />
            <label className="block font-medium text-sm text-gray-600 w-full">
              OR
            </label>
            <hr className="border-gray-300 border-1 w-full rounded-md" />
          </div>
          <SocialComponent />
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account ?
          <NavLink
            to="/"
            className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105 ml-3 text-lg"
          >
            LogIn
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Registerform;
