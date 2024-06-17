import { useState } from "react";
import { useNavigate } from "react-router";

import { useAppSelector } from "@/hooks/useAppSelector";
import { getUserState } from "@/store/user/selector";
import { routes } from "../routes";

import Layout from "@/components/layout";
import Title from "@/ui/title";
import Button from "@/ui/button";
import ProfileField from "@/ui/profileField";
import AvatarEl from "@/ui/avatarEl";
import Modal from "@/ui//modals";
import IconButton from "@/ui/button/iconBtn";

import gameIcon from "@/assets/icons/game.svg";
import style from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";

const Profile = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getUserState).user;

  const [showPassModal, setShowPassModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const togglePassModal = () => {
    setShowPassModal(state => !state);
  };

  const toggleAvatarModal = () => {
    setShowAvatarModal(state => !state);
  };

  const { t } = useTranslation();

  return (
    <Layout.Page className={style.wrapper} pageClass={style.page}>
      <section className={style.profile}>
        <Title.H1 className={style.title} title="Profile" />

        <AvatarEl onClick={toggleAvatarModal} />

        {user ? (
          <div className={style["fields-wrapper"]}>
            <ProfileField
              label={t(TRANSLATIONS.FIRST_NAME)}
              value={user.first_name || "-"}
            />
            <ProfileField
              label={t(TRANSLATIONS.SECOND_NAME)}
              value={user.second_name || "-"}
            />
            <ProfileField
              label={t(TRANSLATIONS.USER_NAME)}
              value={user.display_name || "-"}
            />
            <ProfileField
              label={t(TRANSLATIONS.PHONE)}
              value={user.phone || "-"}
            />
            <ProfileField
              label={t(TRANSLATIONS.LOGIN)}
              value={user.login || "-"}
            />
            <ProfileField
              label={t(TRANSLATIONS.EMAIL)}
              value={user.email || "-"}
            />
          </div>
        ) : (
          <Title.H2>
            Somehow user is missing!!! Have you seen this boy?
          </Title.H2>
        )}

        <Button.Flat
          name={t(TRANSLATIONS.CHANGE_PASSWORD)}
          onClick={togglePassModal}
        />

        {showAvatarModal && <Modal.File closeModal={toggleAvatarModal} />}
        {showPassModal && <Modal.Password closeModal={togglePassModal} />}
      </section>
      <IconButton
        className={style["game-btn"]}
        name="game"
        icon={gameIcon}
        onClick={() => navigate(routes.gameStart)}
      />
    </Layout.Page>
  );
};

export default Profile;
