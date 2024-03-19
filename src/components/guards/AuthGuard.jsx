import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

// For routes that can only be accessed by authenticated users
// function AuthGuard({ children }) {
//   const { isAuthenticated, isInitialized } = useAuth();

//   if (isInitialized && !isAuthenticated) {
//     return <Navigate to="/auth/sign-in" />;
//   }

//   return <React.Fragment>{children}</React.Fragment>;
// }

// function AuthGuard({ children }) {
//   const isAuthenticated = localStorage.getItem("isAuthenticated");

//   if (!isAuthenticated) {
//     return <Navigate to="/auth/sign-in" />;
//   }

//   return <React.Fragment>{children}</React.Fragment>;
// }

function AuthGuard({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const currentTime = Date.now() / 1000; // Current time in seconds
    // console.log("isAuthenticated", isAuthenticated);
    // console.log("tokenExpired", tokenExpired);

    if (tokenExpiration && currentTime > tokenExpiration) {
      // Token has expired
      setTokenExpired(true);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("session has expired");
    } else {
      setTokenExpired(false);
    }
  }, []);

  if (!isAuthenticated || tokenExpired) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
