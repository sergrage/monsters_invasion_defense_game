import { useAppDispatch } from "@/hooks/useAppDispatch";

import { useValidate } from "@/hooks/useValidate";

import FormModal from "../formModal";
import Title from "@/ui/title";
import Button from "@/ui/button";
import Input from "@/ui/input";

import style from "./style.module.scss";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getUserState } from "@/store/user/selector";
import { postforumThreadThunk } from "@/store/forum/actions";

import { TRANSLATIONS } from "@/constants/translations";
import { useTranslation } from "react-i18next";
import TextArea from "@/ui/textArea";

type TProps = {
  closeModal: () => void;
};

const ForumThreadModal = ({ closeModal }: TProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserState).user;
  const userLogin = user?.login || "";

  const { values, errors, errorMessages, handleChange } = useValidate({
    emptyRow: "",
  });

  const handleSubmit = () => {
    // Если есть ошибка валидации - выход
    if (Object.values(errors).some(error => !!error)) {
      return;
    }

    dispatch(
      postforumThreadThunk({
        title: values.emptyRow,
        login: userLogin,
      }),
    ).then(resultAction => {
      if (postforumThreadThunk.fulfilled.match(resultAction)) {
        closeModal();
        values.emptyRow = "";
      }
    });
  };

  const { t } = useTranslation();

  return (
    <FormModal
      modalClassName={style.modal}
      onSubmit={handleSubmit}
      onClose={closeModal}
    >
      <Title.H2 className={style.title} title={t(TRANSLATIONS.NEW_TOPIC)} />

      <div className={style["input-wrapper"]}>
        <Input
          name="emptyRow"
          label={t(TRANSLATIONS.TOPIC_TITLE)}
          required={true}
          value={values.emptyRow}
          onChange={handleChange}
          onError={errors.emptyRow}
          onErrorMessage={errorMessages.emptyRow}
        />
        <TextArea
          name="message"
          label={t(TRANSLATIONS.FIRST_MESSAGE)}
          value={values.message}
          onChange={handleChange}
        />
      </div>

      <Button.Flat
        name={t(TRANSLATIONS.ADD_NEW_TOPIC)}
        type="submit"
        formBtn={true}
        formBtnRed={true}
        noAnimate={true}
        disabled={Object.values(errors).some(error => error)}
      />
    </FormModal>
  );
};

export default ForumThreadModal;
