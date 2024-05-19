import style from "./style.module.scss";
import "./style.css";

import { ToastContainer } from "react-toastify";

export const Toast = () => {
  return (
    <ToastContainer
      toastClassName={style.toast}
      closeButton={false}
      // hideProgressBar={true}
    />
  );
};
