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
    applyData?: (data: responseType) => void,
  ) => {
    // включить индикатор загрузки
    // dispatch(notifyActions.applyLoading());

    // очитсить сообщения об ошибке
    // dispatch(notifyActions.clearError());

    fetch(config.url, {
      method: config.method ? config.method : "GET",
      headers: {
        "Content-type": "application/json",
      },
      body: config.body && JSON.stringify(config.body),
    })
      .then(async response => {
        console.log(response);
        const data = (await response.json()) as responseType;

        if (!response.ok) {
          throw new Error(`${response.status} ${data.reason}`);
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
