import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router'

export default function PrivateRoute() {
  const user = localStorage.getItem("user");

  return user ? <Outlet/> : <Navigate to="/" />;
}
