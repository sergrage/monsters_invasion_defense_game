type configType = {
  url: string;
  method?: string;
  body?: object;
};

type responseType = {
  [key: string]: Record<string, string | { [key: string]: string } | number>;
};

const useFetch = () => {
  // const dispatch = useDispatch();

  const sendRequest = (
    config: configType,
    applyData?: (data: responseType | string) => void,
  ) => {
    // включить индикатор загрузки
    // dispatch(notifyActions.applyLoading());

    // очитсить сообщения об ошибке
    // dispatch(notifyActions.clearError());

    const method = config.method || "GET";
    const headers: HeadersInit =
      config.body instanceof FormData
        ? {}
        : { "Content-type": "application/json" };

    const body =
      config.body instanceof FormData
        ? config.body
        : JSON.stringify(config.body);

    fetch(config.url, {
      method,
      headers,
      body,
      credentials: "include", // handle httponly cookies
    })
      .then(async response => {
        const contentType = response.headers.get("Content-type");
        let data;

        contentType?.includes("application/json")
          ? (data = (await response.json()) as responseType)
          : (data = await response.text());

        if (!response.ok) {
          throw new Error(
            `${response.status} ${(typeof data === "object" && data?.reason) || data}`,
          );
        }

        if (applyData) {
          applyData(data);
        }
      })
      .catch(error => {
        console.log(error);
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
  return sendRequest;
};

export default useFetch;
