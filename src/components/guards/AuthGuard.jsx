import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
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

function AuthGuard({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
