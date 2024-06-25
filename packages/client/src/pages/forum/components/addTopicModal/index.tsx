import React, { FC } from "react";

import style from "./style.module.scss";
import Button from "@/ui/button";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";

export type TProps = {
  hideModalClick: () => void;
};
const AddTopicModal: FC<TProps> = ({ hideModalClick }) => {
  const closeModal = (event: React.FormEvent) => {
    event.preventDefault();
    hideModalClick();
  };
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
  };

  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={style.addTopic}>
        <label
          className={cn(style.addTopic, style.label)}
          htmlFor="forum_topic"
        >
          {t(TRANSLATIONS.TOPIC_TITLE)}
        </label>
        <input
          className={cn(style.addTopic, style.input)}
          name="topic"
          id="forum_topic"
          type="text"
        />
      </div>
      <div className={style.addTopic}>
        <label
          className={cn(style.addTopic, style.label)}
          htmlFor="forum_topic"
        >
          {t(TRANSLATIONS.FIRST_MESSAGE)}
        </label>
        <textarea
          className={cn(style.addTopic, style.textarea)}
          id="forum_topic"
          name="firstMessage"
        />
      </div>
      <div className={cn(style.addTopic, style.horizontal)}>
        <Button.Flat
          name={t(TRANSLATIONS.ADD_NEW_TOPIC)}
          type="submit"
          formBtn={true}
          formBtnRed={true}
          noAnimate={true}
        />
        <Button.Flat
          name={t(TRANSLATIONS.CLOSE)}
          onClick={closeModal}
          formBtn={true}
          formBtnBlue={true}
          noAnimate={true}
        />
      </div>
    </form>
  );
};

export default AddTopicModal;
