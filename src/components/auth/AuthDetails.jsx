import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';

import { auth } from "../../base.js";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Sign In as ${authUser.email}`}</p>
          <button onClick={userSignOut} class="border-2">
            Sign out
          </button>
        </>
      ) : (
        <div className="flex flex-col">
          <p> Signed Out </p>
          <Link to="/sign-in"> Sign in </Link>
          <Link to="/log-in"> Log in </Link>
        </div>
      )}
    </div>
  );
};

export default AuthDetails;
