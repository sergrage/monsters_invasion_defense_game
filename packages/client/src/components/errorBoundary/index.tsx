import { FC, ReactNode, useEffect } from "react";

import { useSelector } from "react-redux";
import { getErrorState } from "@/store/error/selectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { errorSlice } from "@/store/error/reducer";
import Error from "@/pages/error";
import { toast } from "react-toastify";
import type { ToastItem } from "react-toastify";

export type TProps = {
  children: ReactNode | ReactNode[];
};

const ErrorBoundary: FC<TProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const error = useSelector(getErrorState);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(errorSlice.actions.addNotify("error"));
  //   }, 1000);
  //   setTimeout(() => {
  //     dispatch(
  //       errorSlice.actions.addNotify({ message: "aedsfd", status: "error" }),
  //     );
  //     dispatch(
  //       errorSlice.actions.addNotify({ message: "aedsfd", status: "success" }),
  //     );
  //   }, 2000);
  // }, []);

  useEffect(() => {
    error.notifyError?.map(notify => {
      toast[notify.status](notify.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: notify.id,
      });

      toast.onChange((payload: ToastItem) => {
        if (payload.status === "removed" && payload.id === notify.id)
          dispatch(errorSlice.actions.removeNotify(notify.id));
      });
    });
  }, [error.notifyError]);

  if (error.hasError) {
    if (error.globalError) {
      if (error.globalError.status === 404) return <Error.error404 />;
      return <Error.error500 />;
    }

    if (error.notifyError) {
    }
  }

  return <>{children}</>;
};

export default ErrorBoundary;
