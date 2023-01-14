import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar({ name, logout }) {
  let splitName;
  if (name !== undefined) {
    splitName = name.split(" ");
  }

  const modalRef = useRef();
  const blurDivRef = useRef();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const openModal = () => {
    modalRef.current.style.display = "block";
    blurDivRef.current.style.display = "block";
  };

  const closeModal = () => {
    modalRef.current.style.display = "none";
    blurDivRef.current.style.display = "none";
  };

  const submitData = async () => {
    let databaseName = "ContactUserData";
    if (!(userData.name && userData.email && userData.message)) {
      setMessage("Please enter all details.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    try {
      let res = await fetch(
        `${process.env.REACT_APP_REALTIME_DATABASE_URL}/${databaseName}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userData,
          }),
        }
      );
      // console.log(res);
      if (res) {
        setMessage("Your Message Submitted Successfully");
        setUserData({ name: "", email: "", message: "" });
      }

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <header className="bg-[#f5f5f5] p-5 border-b-2 sm:px-10 lg:px-24 sticky top-0">
      <nav className="flex justify-between">
        <h1 className="text-lg font-semibold lg:text-2xl">Silico Note App</h1>
        <ul className="flex  gap-4 font-semibold lg:text-xl lg:gap-10">
          <li className="hidden sm:block">
            Hello {splitName ? splitName[0] : ""}
          </li>
          <NavLink onClick={openModal}>
            <li className="text-blue-600">Contact</li>
          </NavLink>
          <NavLink onClick={(e) => logout(e)}>
            <li className="text-red-600">Logout</li>
          </NavLink>
        </ul>
      </nav>

      <div
        ref={modalRef}
        className="bg-[#03203C] hidden p-5 pt-7 w-[300px] absolute z-10 top-[50%] left-[50%] mt-[50px] mr-0 mb-0 ml-[-150px]  "
      >
        <h3 className="text-center pb-3 text-white">Contact with us</h3>
        <div className="flex  flex-col">
          <input
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="border-2 p-1 border-orange-600"
            type="text"
            placeholder="Your Name"
          />
          <br />
          <input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="border-2 p-1 border-orange-600"
            type="email"
            placeholder="Email"
          />
          <br />
          <textarea
            value={userData.message}
            onChange={(e) =>
              setUserData({ ...userData, message: e.target.value })
            }
            className="border-2 p-1 border-orange-600"
            name=""
            id=""
            cols="20"
            rows="5"
            placeholder="Message"
          ></textarea>

          <h4 className="text-center py-2 text-red-500 font-semibold">
            {message}
          </h4>

          <button
            onClick={submitData}
            className="bg-blue-600 h-[40px]  px-4  text-white font-semibold"
          >
            Submit
          </button>
          <button
            onClick={closeModal}
            className="mx-auto bg-red-600 w-28 mt-5 h-[30px]  px-4  text-white font-semibold"
          >
            Close it
          </button>
        </div>
      </div>
      <div
        ref={blurDivRef}
        className="hidden opacity-80 absolute top-0 left-0 bg-white w-full h-[100vh]"
      ></div>
    </header>
  );
}

export default Navbar;
