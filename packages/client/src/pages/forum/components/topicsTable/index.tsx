import React, { FC } from "react";
import style from "./style.module.scss";
import { useNavigate } from "react-router";
import { routes } from "@/pages/routes";

import tempData from "./temp_data";
import { useTranslation } from "react-i18next";

const TopicsTable: FC = () => {
  let showData = tempData.length > 0;
  const navigate = useNavigate();
  const showTopic = (topic: number): void => {
    navigate(routes.forum + "/" + topic);
  };

  const { t } = useTranslation();

  return (
    <>
      {showData ? (
        <table className={style.topicsTable}>
          <thead>
            <tr>
              <th>{t("Topics")}</th>
              <th>{t("Messages")}</th>
              <th>{t("User")}</th>
              <th>{t("Views")}</th>
              <th>{t("Date")}</th>
            </tr>
          </thead>
          <tbody>
            {tempData.map(item => (
              <tr onClick={() => showTopic(item.id)} key={item.id}>
                <th>{item.topic}</th>
                <td>{item.messages}</td>
                <td>
                  <div className={style.userWrapper}>
                    <div>
                      <img
                        src={item.user.avatar}
                        className={style.userAvatar}
                        alt="user1"
                      />
                    </div>
                    <div>by {item.user.name}</div>
                  </div>
                </td>
                <td>{item.views}</td>
                <td>{item.date}</td>
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
