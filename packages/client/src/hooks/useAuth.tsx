import { useEffect, useState } from "react";
import { authUrl } from "@/endpoints/apiUrl";

type responseType = {
  [key: string]: Record<string, string | { [key: string]: string } | number>;
};

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    updateAuth();
  }, []);

  const updateAuth = () => {
    fetch(`${authUrl}/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
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
        // добавляем сообщение об ошибке
        // dispatch(
        //   notifyActions.applyError(error.message || "Something went wrong"),
        // );
      })
      .finally(() => {
        // выключить индикатор загрузки
        // dispatch(notifyActions.clearLoading());
      });
  };

  return { isAuth, updateAuth };
};

export default useAuth;
