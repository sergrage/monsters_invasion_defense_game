import React, { FC } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/hooks/useAppSelector";

const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = useAppSelector(state => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
