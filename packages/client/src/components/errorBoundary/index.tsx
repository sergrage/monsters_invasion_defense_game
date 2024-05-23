import { FC, ReactNode, useEffect } from "react";

import { getErrorState } from "@/store/error/selectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { errorSlice } from "@/store/error/reducer";
import Error from "@/pages/error";
import { toast } from "react-toastify";
import type { ToastItem } from "react-toastify";
import { useAppSelector } from "@/hooks/useAppSelector";

export type TProps = {
  children: ReactNode | ReactNode[];
};

const ErrorBoundary: FC<TProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getErrorState);

  useEffect(() => {
    error.notifyError?.forEach(notify => {
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
