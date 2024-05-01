import { useRef, useState } from "react";
import cn from "classnames";

import { useOutside } from "@/hooks/useOutside";
import { useModal } from "@/hooks/useModal";
import useFetch from "@/hooks/useFetch";

import { userUrl } from "@/endpoints/apiUrl";

import Title from "@/ui/title";
import Button from "@/ui/button";
import FileInput from "@/ui/fileInput";

import style from "./style.module.scss";

type TProps = {
  closeModal: () => void;
};

const FileModal = ({ closeModal }: TProps) => {
  const modalRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);

  const isClose = useOutside(modalRef, closeModal);
  const { render, isOpen } = useModal();

  const sendRequest = useFetch();

  const [formVal, setFormVal] = useState({});
  const [headerText, setHeaderText] = useState("Upload a file");
  const [isInvalid, setIsInvalid] = useState(true);
  const [previewImg, setPreviewImg] = useState("");

  const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

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

  return render(
    <section
      className={cn(style.backdrop, { [style.show]: isOpen && !isClose })}
    >
      <form
        ref={modalRef}
        className={cn(style.modal, { [style.show]: isOpen && !isClose })}
        onSubmit={onSubmitHandler}
      >
        <Title.H2 className={style.title} title={headerText} />

        {!isInvalid && previewImg && (
          <img className={style.img} src={previewImg} alt="Preview image" />
        )}

        <FileInput name="file" onChange={formChangeHandler} />

        <Button.Flat
          name="Continue upload"
          type="submit"
          positive={true}
          disabled={isInvalid}
        />
      </form>
    </section>,
  );
};

export default FileModal;
