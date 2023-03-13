import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { AuthContext } from "../Context/AuthContext";

export default function PrivateRouteLogin({ children }) {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/dashboard" /> : <Outlet />;
}
