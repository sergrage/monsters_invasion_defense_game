import { useState } from "react";
import { useNavigate } from "react-router";

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

const userDummy = {
  id: 123,
  first_name: "Petya",
  second_name: "Pupkin",
  display_name: "Petya Pupkin",
  phone: "+79001001100",
  login: "userLogin",
  email: "string@ya.ru",
};

const Profile = () => {
  const navigate = useNavigate();

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

        <div className={style["fields-wrapper"]}>
          <ProfileField label="First name" value={userDummy.first_name} />
          <ProfileField label="Second name" value={userDummy.second_name} />
          <ProfileField label="User name" value={userDummy.display_name} />
          <ProfileField label="Phone" value={userDummy.phone} />
          <ProfileField label="Login" value={userDummy.login} />
          <ProfileField label="Email" value={userDummy.email} />
        </div>

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
