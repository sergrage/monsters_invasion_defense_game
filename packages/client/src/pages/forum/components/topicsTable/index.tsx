import { FC, useEffect } from "react";
import style from "./style.module.scss";
import { useNavigate } from "react-router";
import { routes } from "@/pages/routes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getforumAllThreadsThunk } from "@/store/forum/actions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getThreadState } from "@/store/forum/selector";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";
import useFormattedDate from "@/hooks/useDate";
import { getUserState } from "@/store/user/selector";
import { baseYandexUrl } from "@/endpoints/apiUrl";
import randomInteger from "@/utils/randomInteger";

const TopicsTable: FC = () => {
  const dispatch = useAppDispatch();
  const threads = useAppSelector(getThreadState).forumThreads;
  const user = useAppSelector(getUserState).user;

  useEffect(() => {
    dispatch(getforumAllThreadsThunk());
  }, [dispatch]);

  const navigate = useNavigate();
  const showTopic = (topic: number): void => {
    navigate(routes.forum + "/" + topic);
  };

  const { t } = useTranslation();

  return (
    <>
      {threads ? (
        <table className={style.topicsTable}>
          <thead>
            <tr>
              <th>{t(TRANSLATIONS.TOPICS)}</th>
              <th>{t(TRANSLATIONS.MESSAGES)}</th>
              <th>{t(TRANSLATIONS.USER)}</th>
              <th>{t(TRANSLATIONS.VIEWS)}</th>
              <th>{t(TRANSLATIONS.DATE)}</th>
            </tr>
          </thead>
          <tbody>
            {threads?.map(item => (
              <tr onClick={() => showTopic(item.id)} key={item.id}>
                <th className={style.topic}>{item.title}</th>
                <td className={style.messages}>
                  {item.forum_messages?.length == 0
                    ? "Сообщений нет"
                    : `${item.forum_messages[item.forum_messages?.length - 1].text}`}
                </td>
                <td>
                  <div className={style.userWrapper}>
                    <div>
                      <img
                        src={
                          item.login === user?.login && user.avatar
                            ? `${baseYandexUrl}/resources${user.avatar}`
                            : `/src/assets/img/user${randomInteger(1, 2)}.png`
                        }
                        className={style.userAvatar}
                        alt="Автар пользователя"
                      />
                    </div>
                    <div>by {item.login}</div>
                  </div>
                </td>
                <td>{item.views}</td>
                <td>{useFormattedDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={style.infoboard}>
          <p className={style.infoboardMessage}>Create first topic</p>
        </div>
      )}
    </>
  );
};

export default TopicsTable;
