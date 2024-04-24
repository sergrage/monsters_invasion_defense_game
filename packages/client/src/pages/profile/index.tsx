import { useState } from "react";
import { createPortal } from "react-dom";

import Layout from "@/components/Layout";
import Title from "@/ui/title";
import Button from "@/ui/button";
import ProfileField from "@/ui/profileField";
import AvatarImg from "@/ui/avatarImg";
import Modal from "@/ui/modal";

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
  const [showPassModal, setShowPassModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const togglePassModal = () => {
    setShowPassModal(state => !state);
  };

  const toggleAvatarModal = () => {
    setShowAvatarModal(state => !state);
  };

  return (
    <Layout.Page className={style.profile}>
      <Title.H1 className={style.title} title="Profile" />

      <AvatarImg onClick={toggleAvatarModal} />

      <div className={style["fields-wrapper"]}>
        <ProfileField label="First name" value={userDummy.first_name} />
        <ProfileField label="Second name" value={userDummy.second_name} />
        <ProfileField label="User name" value={userDummy.display_name} />
        <ProfileField label="Phone" value={userDummy.phone} />
        <ProfileField label="Login" value={userDummy.login} />
        <ProfileField label="Email" value={userDummy.email} />
      </div>

      <Button.Flat name="Change password" onClick={togglePassModal} />

      {showAvatarModal &&
        createPortal(
          <Modal.File closeModal={toggleAvatarModal} />,
          document.getElementById("modal-root")!,
        )}
      {showPassModal &&
        createPortal(
          <Modal.Password closeModal={togglePassModal} />,
          document.getElementById("modal-root")!,
        )}
    </Layout.Page>
  );
};

export default Profile;
