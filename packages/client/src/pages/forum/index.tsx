import React, { FC, useState } from "react";

import style from "./style.module.scss";

import Layout from "@/components/Layout";

import TopicsTable from "./components/topicsTable";
import AddTopicModal from "./components/addTopicModal";
import Button from "@/ui/button";
import cn from "classnames";

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
        className={cn(
          style.addTopicModal,
          !showModal ? style.hide : style.show,
        )}
      >
        <AddTopicModal hideModalClick={hideModalClick}></AddTopicModal>
      </div>

      <div className={style.hero}>
        <div className={cn(style.wrapper)}>
          <h2 className={cn(style.title)}>Game Forum</h2>
          <h3 className={cn(style.gametitle)}>
            Monsters Invasion Defense Game
          </h3>
          <Button.Flat
            name="Ask question"
            onClick={showModalClick}
            formBtn={true}
            formBtnRed={true}
          />

          <img
            className={cn(style.zombyAlarm)}
            src="/src/assets/img/zombyAlarm.png"
            alt="zombyAlarm"
          />
        </div>
      </div>
      <TopicsTable></TopicsTable>
    </Layout.Page>
  );
};

export default ForumPage;
