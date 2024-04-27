import { useEffect, useId, useRef, useState } from "react";
import cn from "classnames";

import ZombieError from "../zombie_error";
import style from "./style.module.scss";

type TProps = {
  name: string;
  isInvalid?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({ name, isInvalid, onChange }: TProps) => {
  const id = useId();
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const [isUploaded, setIsUploaded] = useState(false);
  const [labelText, setLabelText] = useState("Select file");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setIsUploaded(false);
      return;
    }

    setIsUploaded(true);
    setLabelText(event.target.files![0].name);
    onChange(event);
  };

  return (
    <div className={cn(style.wrapper, { [style.uploaded]: isUploaded })}>
      <label
        className={style.label}
        htmlFor={`input-${id}`}
        onClick={inputRef.current?.click}
      >
        {labelText}
      </label>

      <input
        ref={inputRef}
        className={style.input}
        id={`input-${id}`}
        name={name}
        type="file"
        accept=".jpeg, .jpg, .png, .gif, .webp"
        onChange={changeHandler}
      ></input>

      {isInvalid && <ZombieError />}
    </div>
  );
};

export default FileInput;
