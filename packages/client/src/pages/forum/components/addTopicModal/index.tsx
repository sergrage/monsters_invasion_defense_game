import React, { FC } from "react";

import style from "./style.module.scss";
export type TProps = {
  hideModalClick: () => void;
};
const AddTopicModal: FC<TProps> = ({ hideModalClick }) => {
  const closeModal = (event: React.FormEvent) => {
    event.preventDefault();
    hideModalClick();
  };
  const createNewTopic = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form action="">
      <div className={style.input_group}>
        <label className={style.input_group__label} htmlFor="forum_topic">
          Topic Title
        </label>
        <input
          className={style.input_group__input}
          id="forum_topic"
          type="text"
        />
      </div>
      <div className={style.input_group}>
        <label className={style.input_group__label} htmlFor="forum_topic">
          First Message
        </label>
        <textarea className={style.input_group__textarea} id="forum_topic" />
      </div>
      <div className={style.input_group + " " + style.input_group_horizontal}>
        <button
          onClick={createNewTopic}
          className={style.btn + " " + style.btn_red + " " + style.btn_center}
        >
          Add New Topic
        </button>
        <button
          onClick={closeModal}
          className={style.btn + " " + style.btn_blue + " " + style.btn_center}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default AddTopicModal;
