import { useAppSelector } from "@/hooks/useAppSelector";
import { baseYandexUrl } from "@/endpoints/apiUrl";
import { getUserState } from "@/store/user/selector";

import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";

import style from "./style.module.scss";
import randomInteger from "@/utils/randomInteger";

type TProps = {
  onClick: (event: React.MouseEvent) => void;
};

const AvatarEl = ({ onClick }: TProps) => {
  const user = useAppSelector(getUserState).user;
  const { t } = useTranslation();

  return (
    <div className={style.avatar} onClick={onClick}>
      <div className={style.wrapper}>
        <img
          className={style.img}
          src={
            user?.avatar
              ? `${baseYandexUrl}/resources${user?.avatar}`
              : `/src/assets/img/user${randomInteger(1, 2)}.png`
          }
          alt="User avatar"
        />
        <div className={style.back}>
          <p>{t(TRANSLATIONS.CHANGE_AVATAR)}</p>
        </div>
      </div>
    </div>
  );
};

export default AvatarEl;
