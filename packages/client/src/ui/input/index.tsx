import { useEffect, useId, useState } from "react";
import cn from "classnames";

import ZombieError from "../zombie_error";
import style from "./style.module.scss";

type TProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onError?: boolean;
  onErrorMessage?: string;
};

const Input = ({
  name,
  label,
  placeholder,
  type = "text",
  value,
  required,
  onChange,
  onError,
  onErrorMessage,
}: TProps) => {
  const id = useId();

  return (
    <div className={cn(style.wrapper, { [style.error]: onError })}>
      <label className={style.label} htmlFor={`input-${id}`}>
        {label}
      </label>

      <input
        className={style.input}
        id={`input-${id}`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      ></input>

      {onError && <ZombieError text={onErrorMessage} />}
    </div>
  );
};

export default Input;
