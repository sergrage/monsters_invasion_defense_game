import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { routes } from "@/pages/routes";
import Layout from "@/components/layout";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUserThunk } from "@/store/user/actions";
import { oAuthUrl } from "@/endpoints/apiUrl";

const OAuthPage: FC = () => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const REDIRECT_URI = window.location.origin + "/";

  useEffect(() => {
    const code = queryParams.get("code");
    let postData = {
      code: code,
      redirect_uri: REDIRECT_URI,
    };
    const yandexAuth = async () => {
      const data = await fetch(oAuthUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(postData),
      });
      const text = await data.text();
      return text;
    };

    if (code) {
      yandexAuth()
        .then(res => {
          if (res === "OK") {
            dispatch(getUserThunk()).then(() => {
              navigate(routes.gameStart);
            });
          }
        })
        .catch(err => console.log(err));
    } else {
      navigate(routes.login);
    }
  }, [queryParams]);

  return (
    <Layout.Page>
      <p>Please wait...</p>
    </Layout.Page>
  );
};

export default OAuthPage;
