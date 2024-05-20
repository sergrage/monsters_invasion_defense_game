import { useEffect, useState } from "react";
import { authUrl } from "@/endpoints/apiUrl";
import { notifyActions } from "@/store/notification/reducer";
import { useAppDispatch } from "./useAppDispatch";

type responseType = {
  [key: string]: Record<string, string | { [key: string]: string } | number>;
};

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    updateAuth();
  }, []);

  const updateAuth = () => {
    dispatch(notifyActions.startLoading());
    dispatch(notifyActions.clearError());

    fetch(`${authUrl}/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    })
      .then(async response => {
        const data: responseType = await response.json();

        if (!response.ok) {
          throw new Error(`${response.status} ${data.reason}`);
        }

        dispatch(notifyActions.stopLoading());
        setIsAuth(true);
      })
      .catch(error => {
        setIsAuth(false);

        dispatch(
          notifyActions.setError(error.message || "Something went wrong"),
        );
      })
      .finally(() => {
        dispatch(notifyActions.stopLoading());
      });
  };

  return { isAuth, updateAuth };
};

export default useAuth;
