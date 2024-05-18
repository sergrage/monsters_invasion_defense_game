import { useState } from "react";

import useFetch from "@/hooks/useFetch";

import { userUrl } from "@/endpoints/apiUrl";

import FormModal from "../formModal";
import Title from "@/ui/title";
import Button from "@/ui/button";
import FileInput from "@/ui/fileInput";

import style from "./style.module.scss";

type TProps = {
  closeModal: () => void;
};

const FileModal = ({ closeModal }: TProps) => {
  const sendRequest = useFetch();

  const [formVal, setFormVal] = useState({});
  const [headerText, setHeaderText] = useState("Upload a file");
  const [previewImg, setPreviewImg] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files![0].name) {
      setIsInvalid(true);
      setHeaderText("Wrong file");
      return;
    }

    setPreviewImg(URL.createObjectURL(event.target.files![0]));

    setFormVal(event.target.files![0]);
    setIsInvalid(false);
    setHeaderText("File has been successfully selected");
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("avatar", formVal as Blob);

    sendRequest(
      {
        url: `${userUrl}/profile/avatar`,
        method: "PUT",
        body: formData,
      },
      applyData,
    );
  };

  const applyData = () => {
    closeModal();
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
        name="Continue upload"
        type="submit"
        positive={true}
        disabled={isInvalid}
      />
    </FormModal>
  );
};

export default FileModal;
