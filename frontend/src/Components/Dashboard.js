import React, { useEffect, useState } from "react";
import { signOut, sendEmailVerification } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const fetchData = () => {
    console.log("fetch runn");
    auth.onAuthStateChanged((user) => {
      setUserData(user);
      if (!user) {
        navigate("/login");
        return;
      }
    });
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      alert("Signout Successfull.");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      let user = auth.currentUser;
      let res = await sendEmailVerification(user);
      console.log(user, res);

      alert(
        "Email verifiaction mail send, if not found in primary mail box, check in spam"
      );
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar name={userData?.displayName} logout={logout} />

      {/* Dashboard */}
      <div className="px-5  sm:px-10 lg:px-24">
        <h1 className=" mt-2 sm:hidden font-semibold">
          Hello {userData?.displayName} Add Your Note
        </h1>
        {userData?.emailVerified ? (
          ""
        ) : (
          <NavLink
            className="text-red-600 sm:block sm:py-2 "
            onClick={verifyEmail}
          >
            Click here to verify your email
          </NavLink>
        )}
      </div>

      <div className="flex flex-col gap-2 px-5  sm:px-10 lg:px-24">
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="border-2 border-blue-400 p-2 mt-3"
        />
        <textarea
          name="note"
          cols="30"
          rows="2"
          placeholder="Note"
          className="border-2 border-blue-400 p-2"
        ></textarea>
        <button className="bg-blue-700 py-2 mt-2 text-white font-semibold">
          Add Note
        </button>
      </div>

      <div className="flex justify-between gap-4 px-5 mt-5  sm:px-10 lg:px-24">
        <input
          name="title"
          type="text"
          placeholder="Search here"
          className="border-2 px-4 border-orange-400 w-full"
        />
        <button className="bg-[#FF6263] py-2 px-4 md:px-8 text-white font-semibold">
          Search
        </button>
      </div>

      <div className="mt-5 px-5 sm:px-10 lg:px-24 pb-4">
        <h2 className="text-xl font-bold">Your Notes :</h2>
      </div>

      <div className="px-5 sm:px-10 lg:px-24 border-y-2 pt-5 pb-2 shadow-xl ">
        <div className="flex gap-3">
          <h3 className="text-lg text-blue-600 font-medium leading-none">
            Have to take the Medicine
          </h3>
          <button className="bg-sky-600  px-4  text-white font-semibold">
            Edit
          </button>
          <button className="bg-red-600  px-4  text-white font-semibold">
            Delete
          </button>
        </div>
        <p className="mt-2 ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi nulla
          minima quibusdam tempore ipsum tempora incidunt, optio, quis quas
          corrupti voluptate sed dignissimos doloremque. Pariatur eos quisquam
          inventore incidunt iusto!
        </p>
      </div>

      <div className="px-5 sm:px-10 lg:px-24 border-y-2 pt-5 pb-2 shadow-xl ">
        <div className="flex gap-3">
          <h3 className="text-lg text-blue-600 font-medium leading-none">
            Have to take the Medicine
          </h3>
          <button className="bg-sky-600  px-4  text-white font-semibold">
            Edit
          </button>
          <button className="bg-red-600  px-4  text-white font-semibold">
            Delete
          </button>
        </div>
        <p className="mt-2 ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi nulla
          minima quibusdam tempore ipsum tempora incidunt, optio, quis quas
          corrupti voluptate sed dignissimos doloremque. Pariatur eos quisquam
          inventore incidunt iusto!
        </p>
      </div>
    </>
  );
}

export default Dashboard;
