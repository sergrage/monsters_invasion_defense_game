import { FC, useEffect } from "react";
import style from "./style.module.scss";
import { useNavigate } from "react-router";
import { routes } from "@/pages/routes";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getforumAllThreadsThunk } from "@/store/forum/actions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getThreadState } from "@/store/forum/selector";
import tempData from "./temp_data"; /////////////////////////Удалить
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";
import useFormattedDate from "@/hooks/useDate";

const TopicsTable: FC = () => {
  const dispatch = useAppDispatch();
  const threads = useAppSelector(getThreadState).forumThreads;

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
                <th>{item.title}</th>
                <td>{`item.forum_messages[forum_messages.lenght - 1]`}</td>
                <td>
                  <div className={style.userWrapper}>
                    <div>
                      <img
                        src="#" //добавить аву
                        className={style.userAvatar}
                        alt="user1"
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
