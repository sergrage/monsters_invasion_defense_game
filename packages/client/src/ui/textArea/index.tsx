import { useId } from "react";
import cn from "classnames";

import ZombieError from "../zombieError";

import style from "./style.module.scss";

type TProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onError?: boolean;
  onErrorMessage?: string;
  autocomplete?: string;
};

const TextArea = ({
  name,
  label,
  placeholder,
  value = "",
  required,
  onChange,
  onError,
  onErrorMessage,
  autocomplete,
}: TProps) => {
  const id = useId();

  return (
    <div className={cn(style.wrapper, { [style.error]: onError })}>
      <label className={style.label} htmlFor={`input-${id}`}>
        {label}
      </label>

      <textarea
        className={style.input}
        id={`input-${id}`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autocomplete}
      />

      {onError && <ZombieError text={onErrorMessage} />}
    </div>
  );
};

export default TextArea;
