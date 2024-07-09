import React, { FC } from "react";
import style from "./style.module.scss";
import Title from "@/ui/title";
import { useParams } from "react-router";
import Button from "@/ui/button";
import Layout from "@/components/layout";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";
import ForumTopicMessage from "@/pages/forumTopic/forumMessage";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getThreadState } from "@/store/forum/selector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUserState } from "@/store/user/selector";

const ForumTopics: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserState).user;
  const params = useParams();
  const page = Number(params.topicId);
  const { t } = useTranslation();

  const threads = useAppSelector(getThreadState).forumThreads;
  const forumItem = threads?.find(item => item.id == page);

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const message = formData.get("message") as string;
    console.log("🚀 ~ onSubmitHandler ~ message:", message);
    const userLogin = user?.login || "";
    console.log("🚀 ~ onSubmitHandler ~ userLogin:", userLogin);
  };

  return (
    <Layout.Page>
      <div className={style.titleBox}>
        <Title.H2 title={forumItem?.title} className={style.topic} />
      </div>

      {forumItem?.forum_messages.map(message => (
        <ForumTopicMessage key={message.id} {...message} />
      ))}

      <form onSubmit={onSubmitHandler}>
        <div className={style.footer}>
          <textarea
            className={style.textarea}
            name="message"
            defaultValue="I really enjoyed killing Zomby yesterday!"
          />
          <Button.Flat
            name={t(TRANSLATIONS.SEND_MESSAGE)}
            type="submit"
            deepRed={true}
          />
        </div>
      </form>
    </Layout.Page>
  );
};

export default ForumTopics;
