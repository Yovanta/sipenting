import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router'
import { AuthContext } from '../Context/AuthContext';

export default function PrivateRoute({children}) {
  const { user } = useContext(AuthContext);

  return user ? <Outlet/> : <Navigate to="/" />;
}
