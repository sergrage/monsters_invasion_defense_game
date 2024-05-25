import { useAppSelector } from "@/hooks/useAppSelector";
import { baseYandexUrl } from "@/endpoints/apiUrl";
import { getUserState } from "@/store/user/selector";

import style from "./style.module.scss";

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
          src={`${baseYandexUrl}/resources${user!.avatar}`}
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
