import { useAppSelector } from "@/hooks/useAppSelector";
import { baseYandexUrl } from "@/endpoints/apiUrl";
import { getUserState } from "@/store/user/selector";

import style from "./style.module.scss";
import randomInteger from "@/utils/randomInteger";

type TProps = {
  onClick: (event: React.MouseEvent) => void;
};

const AvatarEl = ({ onClick }: TProps) => {
  const user = useAppSelector(getUserState).user;

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
          <p>Change avatar</p>
        </div>
      </div>
    </div>
  );
};

export default AvatarEl;
