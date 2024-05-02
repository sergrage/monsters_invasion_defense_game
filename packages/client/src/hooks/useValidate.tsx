import { validationRules } from "@/utils/validators";
import { ChangeEvent, useState } from "react";

interface IValues<T> {
  [value: string]: T;
}

interface IErrors {
  [key: string]: boolean;
}

interface IMessages {
  [key: string]: string;
}

export function useValidate(inputValues: IValues<string> = {}) {
  const [values, setValues] = useState<IValues<string>>(inputValues);
  const [errors, setErrors] = useState<IErrors>({});
  const [errorMessages, setErrorMessages] = useState<IMessages>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    if (name in validationRules) {
      const rule = validationRules[name as keyof typeof validationRules];
      setErrors({
        ...errors,
        [name]: !rule.validator(value),
      });
      setErrorMessages({
        ...errorMessages,
        [name]: rule.errorMessage,
      });
    }
  };

  return { values, errors, errorMessages, handleChange };
}
