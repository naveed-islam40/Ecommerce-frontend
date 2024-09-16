import React from "react";
import { Navigate } from "react-router-dom";
import UnautherizedError from "../UnautherizedError/UnautherizedError";

function PrivateRoute({ children, isAdminRoute }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!user;

  if (isAuthenticated) {
    if (isAdminRoute) {
      if (user.role === "admin") {
        return <>{children}</>;
      } else {
        return <UnautherizedError />;
      }
    } else {
      return <>{children}</>;
    }
  } else {
    return <Navigate to="/signup" />;
  }
}

export default PrivateRoute;
