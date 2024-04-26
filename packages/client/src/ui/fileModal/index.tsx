import { useEffect, useRef, useState } from "react";

import { useOutside } from "@/hooks/useOutside";
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
  const wrapperRef: React.MutableRefObject<HTMLFormElement | null> =
    useRef(null);
  useOutside({ ref: wrapperRef, outsideClick: closeModal });
  const sendRequest = useFetch();

  const [formVal, setFormVal] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      wrapperRef.current!.closest("section")!.classList.add(style.show);
      wrapperRef.current!.classList.add(style.show);
    }, 0);
  }, []);

  const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormVal(event.target.files![0]);
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (formVal === {} || !formVal.name) {
      setError(true);
      return;
    }

    setError(false);

    if (error) return;

    const formData = new FormData();
    formData.append("avatar", formVal as Blob);

    sendRequest(
      {
        url: `${userUrl}/password`,
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
    <section className={style.backdrop}>
      <form ref={wrapperRef} className={style.modal} onSubmit={onSubmitHandler}>
        <Title.H2 className={style.title} title="Upload file" />
        <FileInput
          name="file"
          label="Upload file"
          onChange={formChangeHandler}
        />
        <Button.Flat name="Upload" type="submit" />
      </form>
    </section>
  );
};

export default FileModal;
