import { FC } from "react";

import style from "./style.module.scss";
import Image from "@/ui/image";
import Layout from "@/components/layout";
import Button from "@/ui/button";
import zombieAlarm from "@/assets/img/zombieAlarm.png";
import TopicsTable from "./components/topicsTable";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";
import useOpenModal from "@/hooks/useOpenModal";
import Modal from "@/ui/modals";

const ForumPage: FC = () => {
  const { isOpen: showForumThreadModal, toggleModal: toggleforumThreadModal } =
    useOpenModal();

  const { t } = useTranslation();

  return (
    <Layout.Page>
      <div className={style.hero}>
        <div className={cn(style.wrapper)}>
          <h2 className={cn(style.title)}>{t(TRANSLATIONS.GAME_FORUM)}</h2>
          <h3 className={cn(style.gametitle)}>
            Monsters Invasion Defense Game
          </h3>
          <Button.Flat
            name={t(TRANSLATIONS.ASK_QUESTION)}
            onClick={toggleforumThreadModal}
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
      <TopicsTable />
      {showForumThreadModal && (
        <Modal.ForumThread closeModal={toggleforumThreadModal} />
      )}
    </Layout.Page>
  );
};

export default ForumPage;
