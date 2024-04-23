import React, { FC } from "react";

import style from "./style.module.scss";
import Layout from "@/components/Layout";
import { useParams } from "react-router";

import temp_data from "@/pages/forumTopic/temp_data";

const ForumTopics: FC = () => {
  const params = useParams();
  const page = params.topicId;

  return (
    <Layout.Page>
      <div className={style.titleBox}>
        <h2 className={style.topic}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h2>
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
                <img src={item.user.avatar} alt="" />
              </div>
            </div>
            <div className={style.text}>
              <p>{item.message}</p>
            </div>
          </div>
        </div>
      ))}

      <form action="">
        <div className={style.footer}>
          <textarea className={style.textarea} />
          <button className={style.sendMessage}>Send Message</button>
        </div>
      </form>
    </Layout.Page>
  );
};

export default ForumTopics;
