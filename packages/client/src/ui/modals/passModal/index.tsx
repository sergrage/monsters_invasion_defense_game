import { useAppDispatch } from "@/hooks/useAppDispatch";
import { changePassThunk } from "@/store/user/actions";

import { useValidate } from "@/hooks/useValidate";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";

import FormModal from "../formModal";
import Title from "@/ui/title";
import Button from "@/ui/button";
import Input from "@/ui/input";

import style from "./style.module.scss";

type TProps = {
  closeModal: () => void;
};

type TPassword = {
  oldPassword: string;
  newPassword: string;
};

const PasswordModal = ({ closeModal }: TProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { values, errors, errorMessages, handleChange } = useValidate({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = () => {
    // Если есть ошибка валидации или пустые значения - выход
    if (
      Object.values(errors).some(error => !!error) ||
      Object.values(values).some(value => !value)
    ) {
      return;
    }

    dispatch(
      changePassThunk({
        oldPassword: values.oldPassword,
        newPassword: values.password,
      } as TPassword),
    ).then(resultAction => {
      if (changePassThunk.fulfilled.match(resultAction)) {
        closeModal();
      }
    });
  };

  return (
    <FormModal
      modalClassName={style.modal}
      onSubmit={handleSubmit}
      onClose={closeModal}
    >
      <Title.H2
        className={style.title}
        title={t(TRANSLATIONS.CHANGE_PASSWORD)}
      />

      <div className={style["input-wrapper"]}>
        <Input
          name="oldPassword"
          label={t(TRANSLATIONS.OLD_PASSWORD)}
          type="password"
          required={true}
          value={values.oldPassword}
          onChange={handleChange}
          onError={errors.oldPassword}
          onErrorMessage={errorMessages.oldPassword}
        />
        <Input
          name="password"
          label={t(TRANSLATIONS.NEW_PASSWORD)}
          type="password"
          required={true}
          value={values.password}
          onChange={handleChange}
          onError={errors.password}
          onErrorMessage={errorMessages.password}
        />
        <Input
          name="confirmPassword"
          label={t(TRANSLATIONS.CONFIRM_NEW_PASSWORD)}
          type="password"
          required={true}
          value={values.confirmPassword}
          onChange={handleChange}
          onError={errors.confirmPassword}
          onErrorMessage={errorMessages.confirmPassword}
        />
      </div>

      <Button.Flat
        name={t(TRANSLATIONS.CHANGE)}
        type="submit"
        positive={true}
        disabled={
          Object.values(errors).some(error => error) ||
          Object.values(values).some(value => !value)
        }
      />
    </FormModal>
  );
};

export default PasswordModal;
