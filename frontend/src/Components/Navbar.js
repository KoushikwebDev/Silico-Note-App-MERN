import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ name, logout }) {
  let splitName;

  if (name !== undefined) {
    splitName = name.split(" ");
  }
  return (
    <header className="bg-[#f5f5f5] p-5 border-b-2 sm:px-10 lg:px-24 sticky top-0">
      <nav className="flex justify-between">
        <h1 className="text-lg font-semibold lg:text-2xl">Silico Note App</h1>
        <ul className="flex  gap-4 font-semibold lg:text-xl lg:gap-10">
          <li className="hidden sm:block">
            Hello {splitName ? splitName[0] : ""}
          </li>
          <NavLink to="/contact">
            <li className="text-blue-600">Contact</li>
          </NavLink>
          <NavLink onClick={(e) => logout(e)}>
            <li className="text-red-600">Logout</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
