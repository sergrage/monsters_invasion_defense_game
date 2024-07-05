type TConfig = {
  url: string;
  method?: string;
  body?: object;
};

type TError = {
  reason: string;
};

//import { TUser } from "@/store/user/type";

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
    if (!response.ok) {
      const errorMessage = `Error ${response.status} ${((await response.json()) as TError).reason}`;
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("Content-type");
    let responseData;

    contentType?.includes("application/json")
      ? (responseData = await response.json())
      : (responseData = null);

    return responseData;
  });

  return data;
}

export default apiFetch;
