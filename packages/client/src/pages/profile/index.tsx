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
import useOpenModal from "@/hooks/useOpenModal";
import { Toggle } from "@/ui/toggle";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setThemeThunk } from "@/store/theme/actions";
import { TTheme } from "@/store/theme/type";
import { getThemeState } from "@/store/theme/reducer";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserState).user;
  const theme = useAppSelector(getThemeState).data.theme_type;
  const navigate = useNavigate();

  const { isOpen: showPassModal, toggleModal: togglePassModal } =
    useOpenModal();

  const { isOpen: showAvatarModal, toggleModal: toggleAvatarModal } =
    useOpenModal();

  const { t } = useTranslation();

  const setTheme = (isDark: boolean) => {
    if (user?.id) {
      const theme: TTheme = isDark ? "dark" : "light";

      dispatch(
        setThemeThunk({
          user_id: user.id,
          theme_type: theme,
        }),
      );
    }
  };

  return (
    <Layout.Page className={style.wrapper} pageClass={style.page}>
      <section className={style.profile}>
        <Title.H1 className={style.title} title="Profile" />

        <AvatarEl onClick={toggleAvatarModal} />

        {user?.id && (
          <div className={style.theme_toggle}>
            <span>{t(TRANSLATIONS.USE_DARK_MODE)}</span>
            <Toggle
              className={style.switch}
              onChange={(val: boolean) => setTheme(val)}
              checked={theme === "dark"}
            />
          </div>
        )}

        {user ? (
          <div className={style.fields_wrapper}>
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
