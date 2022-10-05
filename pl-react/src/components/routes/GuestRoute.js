import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function GuestRoute() {
  const { user } = useUser();
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}
