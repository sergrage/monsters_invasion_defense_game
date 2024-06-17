import { FC, useState } from "react";

import style from "./style.module.scss";
import Image from "@/ui/image";
import Layout from "@/components/layout";
import Button from "@/ui/button";
import zombieAlarm from "@/assets/img/zombieAlarm.png";
import TopicsTable from "./components/topicsTable";
import AddTopicModal from "./components/addTopicModal";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";

const ForumPage: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalClick = () => {
    setShowModal(true);
  };

  const hideModalClick = () => {
    setShowModal(false);
  };

  const { t } = useTranslation();

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
          <h2 className={cn(style.title)}>{t(TRANSLATIONS.GAME_FORUM)}</h2>
          <h3 className={cn(style.gametitle)}>
            Monsters Invasion Defense Game
          </h3>
          <Button.Flat
            name={t(TRANSLATIONS.ASK_QUESTION)}
            onClick={showModalClick}
            formBtn={true}
            formBtnRed={true}
            noAnimate={true}
          />
          <Image
            className={style.zombieAlarm}
            src={zombieAlarm}
            alt="zombieAlarm"
          ></Image>
        </div>
      </div>
      <TopicsTable></TopicsTable>
    </Layout.Page>
  );
};

export default ForumPage;
