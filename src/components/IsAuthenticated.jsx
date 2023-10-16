import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsAuthenticated = ({ isLoggedIn }) => {
  if (!isLoggedIn) <Navigate to="/login" />;

  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />}</>;
};

export default IsAuthenticated;
