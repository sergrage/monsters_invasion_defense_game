type TConfig = {
  url: string;
  method?: string;
  body?: object;
};

type TError = {
  reason: string;
};

import { TUser } from "@/store/user/type";

async function apiFetch(config: TConfig) {
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

    if (!response.ok) {
      const errorMessage = `${response.status} ${
        contentType?.includes("application/json")
          ? (responseData = (await response.json()) as TError)
          : (responseData = await response.text())
      }`;
      throw new Error(errorMessage);
    }

    contentType?.includes("application/json")
      ? (responseData = (await response.json()) as TUser)
      : (responseData = await response.text());

    return responseData;
  });

  return data;
}

export default apiFetch;
