import React, { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/hooks/useAppSelector";
import { getUserState } from "@/store/user/selector";

const ProtectedRoute: FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isAuth = useAppSelector(getUserState).isAuth;

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
