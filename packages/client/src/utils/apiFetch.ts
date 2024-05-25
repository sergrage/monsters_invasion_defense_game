type configType = {
  url: string;
  method?: string;
  body?: object;
};

type responseType = {
  [key: string]: string;
};

async function apiFetch(config: configType) {
  const method = config.method || "GET";
  const headers: HeadersInit =
    config.body instanceof FormData
      ? {}
      : { "Content-type": "application/json" };

  const body =
    config.body instanceof FormData ? config.body : JSON.stringify(config.body);

  const data = await fetch(config.url, {
    method,
    headers,
    body,
    credentials: "include", // handle httponly cookies
  }).then(async response => {
    const contentType = response.headers.get("Content-type");
    let responseData;

    contentType?.includes("application/json")
      ? (responseData = (await response.json()) as responseType)
      : (responseData = await response.text());

    if (!response.ok) {
      const errorMessage = `${response.status} ${(typeof responseData === "object" && responseData?.reason) || responseData}`;
      throw new Error(errorMessage);
    }

    return responseData;
  });

  return data;
}

export default apiFetch;
