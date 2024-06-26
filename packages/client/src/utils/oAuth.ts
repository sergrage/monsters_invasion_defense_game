import { baseYandexUrl } from "@/endpoints/apiUrl";

export const oAuthYandex = async () => {
  const REDIRECT_URI = window.location.origin + "/";
  const GET_SERVICE_ID_URI = "/oauth/yandex/service-id";

  const AUTH_AUTHORIZE_URI = "https://oauth.yandex.ru/authorize";

  const getServiceIdparams = new URLSearchParams({
    redirect_uri: REDIRECT_URI,
  });

  try {
    let response = await fetch(
      baseYandexUrl + GET_SERVICE_ID_URI + "?" + getServiceIdparams,
    );

    let json = await response.json();

    const serviceId = json.service_id;

    const authparams = new URLSearchParams({
      response_type: "code",
      redirect_uri: REDIRECT_URI,
      client_id: serviceId,
    });

    window.location.replace(AUTH_AUTHORIZE_URI + "?" + authparams);
  } catch (err) {
    console.log(err);
  }
};
