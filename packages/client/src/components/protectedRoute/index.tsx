import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/hooks/useAppSelector";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useAppSelector(state => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
