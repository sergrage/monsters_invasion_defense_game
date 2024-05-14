import { useEffect, useState } from "react";
import useFetch from "./useFetch";

import { authUrl } from "@/endpoints/apiUrl";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const sendRequest = useFetch();

  useEffect(() => {
    sendRequest({ url: `${authUrl}/user` }, applyData);
  }, []);

  const applyData = () => {
    setIsAuth(true);
  };

  return isAuth;
};

export default useAuth;
