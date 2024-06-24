import React, { FC, useEffect } from "react";

import style from "./style.module.scss";
import Title from "@/ui/title";

import { useParams } from "react-router";

import temp_data from "@/pages/forumTopic/temp_data";
import Button from "@/ui/button";
import Layout from "@/components/layout";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getforumAllThreadsThunk } from "@/store/forum/actions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getThreadState } from "@/store/forum/selector";

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

  const dispatch = useAppDispatch();
  const threads = useAppSelector(getThreadState).forumThreads;

  useEffect(() => {
    dispatch(getforumAllThreadsThunk());
  }, [dispatch]);

  return (
    <Layout.Page>
      <div className={style.titleBox}>
        <Title.H2
          title={"Lorem ipsum dolor sit amet, consectetur adipisicing elit"}
          className={style.topic}
        />
      </div>

      {threads?.map(item => (
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
