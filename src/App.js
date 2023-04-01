// # ------------------------------------------------
// # Main react file
// TODO fix 'invalid hook call' when searcing for recipes
// # ------------------------------------------------

//  TODO- use router to handle pages
//  TODO- react sidebar
//  TODO- fix header and footer
//  TODO- separate Searching.js in files
//  TODO- database.......
//  TODO- ALL front-end


import "./App.css";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

// * file with the auth module from firebase
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AuthDetails from "./components/auth/AuthDetails";
import RandomRecipes from "./components/recipes/RandomRecipes";
//* file with sidebar menù
import SideBar from "./components/SideBar";
// * file with spoonacular api features
// import Searcing from "./components/recipes/Searcing.js";
import Searching from "./components/recipes/Searching";
// * in this json file there are all style information (colors, font, ...)
import styles from './components/styles.json'
// * footer and header file
import Header from "./components/Header";
import Footer from "./components/Footer";

// * home page
import HomePage from './components/HomePage.js'

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
  // const PageSelector = () => {
  //   const HomePage = () => {
  //     return (
  //       <div>
  //         <button
  //           className="border-2"
  //           onClick={(e) => {
  //             e.preventDefault();
  //             setSubPage("auth");
  //           }}
  //         >
  //           Authentication
  //         </button>
  //         <button
  //           className="border-2"
  //           onClick={(e) => {
  //             e.preventDefault();
  //             setSubPage("search");
  //           }}
  //         >
  //           Searching
  //         </button>
  //         <button
  //           className="border-2"
  //           onClick={(e) => {
  //             e.preventDefault();
  //             setSubPage("random");
  //           }}
  //         >
  //           Get a random recipes
  //         </button>
  //       </div>
  //     );
  //   };

  //   const Selector = () => {
  //     switch (subPage) {
  //       case "home":
  //         return <HomePage />;
  //       case "search":
  //         return <Searcing />;
  //       case "auth":
  //         return (
  //           <div>
  //             <SignIn /> <SignUp />
  //           </div>
  //         );
  //       case "random":
  //         return <RandomRecipes />
  //       default: // TODO error page
  //     }
  //   };

  //   return Selector();
  // };

  // # rendering
  return (
    <div className="flex flex-col h-screen justify-between items-center">
      {/* <header className="h-1/6 bg-orange w-full justify-center items-center">
        <div>
          <h1>HEADER2</h1>
          <button className="border-2">user</button>
        </div>
      </header> */}
      <Header theme={theme} />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/log-in' element={<SignIn />}/>
        <Route path='/sign-in' element={<SignUp />}/>
        <Route path='/complex-search' element={<Searching />}/>
        <Route path='/random' element={<RandomRecipes />}/>
        <Route path='/userspace' element={<AuthDetails />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
