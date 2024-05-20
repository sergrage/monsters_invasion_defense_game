import { useEffect, useState } from "react";
import { notifyActions } from "@/store/notification/reducer";
import { useAppDispatch } from "./useAppDispatch";

import { authUrl } from "@/endpoints/apiUrl";

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

        setIsAuth(true);
      })
      .catch(error => {
        setIsAuth(false);

        console.log(error);
      })
      .finally(() => {
        dispatch(notifyActions.stopLoading());
      });
  };

  return { isAuth, updateAuth };
};

export default useAuth;
