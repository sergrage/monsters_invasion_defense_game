import { useEffect } from "react";

import { useAppDispatch } from "./useAppDispatch";
import { notifyActions } from "@/store/notification/reducer";
import { authActions } from "@/store/auth/reducer";

import { authUrl } from "@/endpoints/apiUrl";

type responseType = {
  [key: string]: Record<string, string | { [key: string]: string } | number>;
};

const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    updateAuth();
  }, []);

  const updateAuth = () => {
    dispatch(notifyActions.startLoading());

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

        dispatch(authActions.logIn());
      })
      .catch(error => {
        dispatch(authActions.logOut());

        console.log(error);
      })
      .finally(() => {
        dispatch(notifyActions.stopLoading());
      });
  };

  return { updateAuth };
};

export default useAuth;
