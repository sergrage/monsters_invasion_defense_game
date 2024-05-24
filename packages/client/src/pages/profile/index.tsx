import { useState } from "react";
import { useNavigate } from "react-router";

import { useAppSelector } from "@/hooks/useAppSelector";
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

const Profile = () => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.user);

  const [showPassModal, setShowPassModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const togglePassModal = () => {
    setShowPassModal(state => !state);
  };

  const toggleAvatarModal = () => {
    setShowAvatarModal(state => !state);
  };

  return (
    <Layout.Page className={style.wrapper} pageClass={style.page}>
      <section className={style.profile}>
        <Title.H1 className={style.title} title="Profile" />

        <AvatarEl onClick={toggleAvatarModal} />

        {user ? (
          <div className={style["fields-wrapper"]}>
            <ProfileField label="First name" value={user.first_name || "-"} />
            <ProfileField label="Second name" value={user.second_name || "-"} />
            <ProfileField label="User name" value={user.display_name || "-"} />
            <ProfileField label="Phone" value={user.phone || "-"} />
            <ProfileField label="Login" value={user.login || "-"} />
            <ProfileField label="Email" value={user.email || "-"} />
          </div>
        ) : (
          <Title.H2>
            Somehow user is missing!!! Have you seen this boy?
          </Title.H2>
        )}

        <Button.Flat name="Change password" onClick={togglePassModal} />

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
