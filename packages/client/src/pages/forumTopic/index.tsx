import React, { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { routes } from "@/pages/routes";

import Title from "@/ui/title";
import Button from "@/ui/button";
import Layout from "@/components/layout";
import ForumTopicMessage from "@/pages/forumTopic/forumMessage";
import { getThreadState } from "@/store/forum/selector";
import { getUserState } from "@/store/user/selector";
import { postforumMessageThunk } from "@/store/forum/actions";
import IconButton from "@/ui/button/iconBtn";

import backIcon from "@/assets/icons/back.svg";
import gameIcon from "@/assets/icons/game.svg";
import style from "./style.module.scss";

const ForumTopics: FC = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserState).user;
  const params = useParams();
  const page = Number(params.topicId);
  const { t } = useTranslation();

  const threads = useAppSelector(getThreadState).forumThreads;
  const forumItem = threads?.find(item => item.id == page);
  const forumMessages = forumItem?.forum_messages;

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const message = formData.get("message") as string;
    const userLogin = user?.login || "";
    dispatch(
      postforumMessageThunk({
        thread_id: page,
        login: userLogin,
        text: message,
      }),
    );
    setMessage("");
  };
  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Layout.Page>
      <div className={style.titleBox}>
        <Title.H2 title={forumItem?.title} className={style.topic} />
      </div>

      {forumMessages?.map(message => (
        <ForumTopicMessage key={message.id} {...message} />
      ))}

      <form onSubmit={onSubmitHandler}>
        <div className={style.footer}>
          <textarea
            className={style.textarea}
            name="message"
            value={message}
            onChange={onMessageChange}
            placeholder="I really enjoyed killing Zomby yesterday!"
          />
          <Button.Flat
            name={t(TRANSLATIONS.SEND_MESSAGE)}
            type="submit"
            deepRed={true}
            disabled={!message.trim()}
          />
        </div>
      </form>

      <div className={style.iconsWrapper}>
        <IconButton
          name="game"
          icon={gameIcon}
          onClick={() => navigate(routes.gameStart)}
        />
        <IconButton
          name="back"
          icon={backIcon}
          onClick={() => navigate(routes.forum)}
        />
      </div>
    </Layout.Page>
  );
};

export default ForumTopics;
