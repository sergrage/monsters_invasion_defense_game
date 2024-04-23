import React, { FC, useState } from "react";

import style from "./style.module.scss";

import Layout from "@/components/Layout";

import TopicsTable from "./components/topicsTable";
import AddTopicModal from "./components/addTopicModal";

const ForumPage: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalClick = () => {
    setShowModal(true);
  };

  const hideModalClick = () => {
    setShowModal(false);
  };

  return (
    <Layout.Page>
      <div
        className={style.forum__add_threat}
        style={{
          opacity: !showModal ? "0" : "1",
          transition: "all .5s",
          visibility: !showModal ? "hidden" : "visible",
        }}
      >
        <AddTopicModal hideModalClick={hideModalClick}></AddTopicModal>
      </div>

      <div className={style.forum__hero}>
        <div className={style.forum__hero__wrapper}>
          <h2 className={style.forum__hero__title}>Game Forum</h2>
          <h3 className={style.forum__hero__gametitle}>
            Monsters Invasion Defense Game
          </h3>
          <button
            className={
              style.forum__hero__btn + " " + style.forum__hero__btn_red
            }
            onClick={showModalClick}
          >
            Ask question
          </button>

          <img
            className={style.forum__hero__zombyAlarm}
            src="/src/assets/img/zombyAlarm.png"
            alt="gear"
          />
        </div>
      </div>
      <TopicsTable></TopicsTable>
    </Layout.Page>
  );
};

export default ForumPage;
