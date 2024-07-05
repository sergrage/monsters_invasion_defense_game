import React, { FC } from "react";
import style from "./style.module.scss";
import Title from "@/ui/title";
import { useParams } from "react-router";
import temp_data from "@/pages/forumTopic/temp_data"; /////////////////////////Удалить
import Button from "@/ui/button";
import Layout from "@/components/layout";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";
import ForumTopicMessage from "@/pages/forumTopic/forumMessage";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getThreadState } from "@/store/forum/selector";

const ForumTopics: FC = () => {
  const params = useParams();
  const page = params.topicId;
  const { t } = useTranslation();

  const threads = useAppSelector(getThreadState).forumThreads;

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
  };

  return (
    <Layout.Page>
      <div className={style.titleBox}>
        <Title.H2
          title={"Lorem ipsum dolor sit amet, consectetur adipisicing elit"}
          className={style.topic}
        />
      </div>

      {threads?.map(item => <ForumTopicMessage item={item} key={item.id} />)}

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
