import { useEffect, useState } from "react";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { changeAvatarThunk } from "@/store/user/actions";
import { getUserState } from "@/store/user/selector";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useTranslation } from "react-i18next";

import FormModal from "../formModal";
import Title from "@/ui/title";
import Button from "@/ui/button";
import FileInput from "@/ui/fileInput";
import { TRANSLATIONS } from "@/constants/translations";

import style from "./style.module.scss";

type TProps = {
  closeModal: () => void;
};

const FileModal = ({ closeModal }: TProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [formVal, setFormVal] = useState({});
  const [headerText, setHeaderText] = useState(t(TRANSLATIONS.UPLOAD_FILE));

  const [previewImg, setPreviewImg] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);

  const userState = useAppSelector(getUserState);
  const [currentAvatar] = useState(userState.user!.avatar);

  useEffect(() => {
    if (!userState.isLoading && currentAvatar !== userState.user!.avatar)
      closeModal();
  }, [userState.isLoading, userState.user!.avatar]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files![0].name) {
      setIsInvalid(true);
      setHeaderText(t(TRANSLATIONS.WRONG_FILE));
      return;
    }

    setPreviewImg(URL.createObjectURL(event.target.files![0]));

    setFormVal(event.target.files![0]);
    setIsInvalid(false);
    setHeaderText(t(TRANSLATIONS.UPLOAD_SUCCESS));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("avatar", formVal as Blob);

    dispatch(changeAvatarThunk(formData));
  };

  return (
    <FormModal
      modalClassName={style.modal}
      onSubmit={handleSubmit}
      onClose={closeModal}
    >
      <Title.H2 className={style.title} title={headerText} />
      {!isInvalid && previewImg && (
        <img className={style.img} src={previewImg} alt="Preview image" />
      )}
      <FileInput name="file" onChange={handleInputChange} />
      <Button.Flat
        name={t(TRANSLATIONS.CONTINUE_UPLOAD)}
        type="submit"
        positive={true}
        disabled={isInvalid}
      />
    </FormModal>
  );
};

export default FileModal;
