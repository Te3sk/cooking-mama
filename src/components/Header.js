import React from "react";
import { useState, useEffect } from "react";
import styles from "./styles.json";
import { Routes, Route, Link } from 'react-router-dom';


import PageSelector from "../PageSelector";

import SideBar from "./SideBar";

function Header({ theme }) {
  //* show or not the sidebar menù

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  // ! temp to see if it work
  const userBut = () => {
    console.log("User");
  };

  return (
    <div className="w-full">
    <header className="bg-[#e9aa73] w-full h-28 flex flex-row justify-between">
      <div className="self-center flex flex-row">
        {/* menù button */}
        <button onClick={showSidebar} className = "ml-5 mr-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 72 72"
          >
            <path d="M56 48c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 48 54.798 48 56 48zM56 32c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 32 54.798 32 56 32zM56 16c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 16 54.798 16 56 16z"></path>
          </svg>
        </button>
        {/* home button */}
        <Link to="/">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
      </div>
      {/* logo */}
      <Link to="/" className="self-center">
      <p className="border-2">
        logo
      </p>
      </Link>
      {/* user button */}
      <Link to='/userspace' className="self-center mx-5">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
          <circle cx="12" cy="10" r="3" />
          <circle cx="12" cy="12" r="10" />
        </svg></Link>
    </header>
    {sidebar ? 
    <SideBar />
    : <></>}
    </div>
  );
}

export default Header;
