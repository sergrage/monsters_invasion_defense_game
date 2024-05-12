import { FC, ReactNode, useEffect } from "react";
import cn from "classnames";

import style from "./style.module.scss";
import { useSelector } from "react-redux";
import { getErrorState } from "@/store/error/selectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { errorSlice } from "@/store/error/reducer";

export type TProps = {
  children: ReactNode | ReactNode[];
};

const ErrorBoundary: FC<TProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const error = useSelector(getErrorState);

  useEffect(() => {
    console.log("start");
    setTimeout(() => {
      dispatch(errorSlice.actions.addNotify("error"));
    }, 1000);
  }, []);

  if (!error.hasError) return <>{children}</>;

  return (
    <div style={{ textAlign: "center" }}>
      <strong>Ошибка при работе приложения</strong>
      <p>Пожалуйста, перезагрузите страницу</p>
    </div>
  );
};

export default ErrorBoundary;
