// # ------------------------------------------------
// # Main react file
// todo fix 'invalid hook call' when searcing for recipes
// # ------------------------------------------------

/* TODO
  - fix header and footer
  - separate Searching.js in files
  - database.......
  - ALL front-end
*/

import "./App.css";
import logo from "./logo.svg";
import React, { Component } from "react";
import { useState, useEffect } from "react";
// * file with the auth module from firebase
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/AuthDetails";
import RandomRecipes from "./components/recipes/RandomRecipes";
// * file with spoonacular api features
import Searcing from "./components/recipes/Searcing.js";
// * in this json file there are all style information (colors, font, ...)
import styles from './components/styles.json'
// * footer and header file
import Header from "./components/Header";

function App() {
  const apiKey = "6eef74cb8a6d4fc8afd1d4010381f7b2";
  //*  light or dark theme is default light
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  // * true if the user is logged in, false otherwise
  const [loged, setLoged] = useState(
    localStorage.getItem("user") ? true : false
  );

  // * temp usestate to select sub-page
  const [subPage, setSubPage] = useState("home");

  // # temp sub-page selector
  const PageSelector = () => {
    const HomePage = () => {
      return (
        <div>
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setSubPage("auth");
            }}
          >
            Authentication
          </button>
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setSubPage("search");
            }}
          >
            Searching
          </button>
          <button
            className="border-2"
            onClick={(e) => {
              e.preventDefault();
              setSubPage("random");
            }}
          >
            Get a random recipes
          </button>
        </div>
      );
    };

    const Selector = () => {
      switch (subPage) {
        case "home":
          return <HomePage />;
        case "search":
          return <Searcing />;
        case "auth":
          return (
            <div>
              <SignIn /> <SignUp />
            </div>
          );
        case "random":
          return <RandomRecipes />
      }
    };

    return Selector();
  };

  // # rendering
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <header className="h-1/6 bg-orange w-full justify-center items-center">
        <div>
          <h1>HEADER2</h1>
          <button className="border-2">user</button>
        </div>
      </header> */}
      <Header theme={theme} />
      <div className=" h-4/6 bg-creambg w-full mb-auto">
        <button
          className="border-2"
          onClick={(e) => {
            e.preventDefault();
            setSubPage("home");
          }}
        >
          Home
        </button>
        <PageSelector />
      </div>
      <footer className=" inset-x-0 bottom-0 h-1/6 bg-orange w-full">
        FOOTER
      </footer>
    </div>
  );
}

export default App;
