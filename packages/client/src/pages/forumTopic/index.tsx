import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Helmet } from "react-helmet";

import Title from "@/ui/title";
import temp_data from "@/pages/forumTopic/temp_data";
import Button from "@/ui/button";
import Layout from "@/components/layout";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getUserState } from "@/store/user/selector";
import { routes } from "../routes";

import style from "./style.module.scss";

let isInit = true;

const ForumTopics: FC = () => {
  const params = useParams();
  const page = params.topicId;
  // TODO get message by topic id
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
  };

  const navigate = useNavigate();

  const isAuth = useAppSelector(getUserState).isAuth;

  useEffect(() => {
    if (isInit) {
      isInit = false;
      return;
    }
    if (isAuth) return;

    navigate(routes.login);
  }, [isAuth]);

  return (
    <Layout.Page>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hot topic</title>
        <meta name="description" content="Forum topic" />
      </Helmet>

      <div className={style.titleBox}>
        <Title.H2
          title={"Lorem ipsum dolor sit amet, consectetur adipisicing elit"}
          className={style.topic}
        />
      </div>

      {temp_data.map(item => (
        <div className={style.message} key={item.id}>
          <div className={style.date}>
            <span>{item.date}</span>
            <span>#{item.id}</span>
          </div>
          <div className={style.body}>
            <div className={style.user}>
              <div className={style.name}>{item.user.name}</div>
              <div className={style.avatar}>
                <img src={item.user.avatar} alt="avatar" />
              </div>
            </div>
            <div className={style.text}>
              <p>{item.message}</p>
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={onSubmitHandler}>
        <div className={style.footer}>
          <textarea
            className={style.textarea}
            name="message"
            defaultValue="I really enjoyed killing Zomby yesterday!"
          />
          <Button.Flat name="Send Message" type="submit" deepRed={true} />
        </div>
      </form>
    </Layout.Page>
  );
};

export default ForumTopics;
