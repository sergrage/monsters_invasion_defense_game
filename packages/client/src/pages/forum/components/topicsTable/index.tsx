import React, { FC } from "react";
import style from "./style.module.scss";
import { useNavigate } from "react-router";

import tempData from "./temp_data";

const TopicsTable: FC = () => {
  const navigate = useNavigate();
  const showTopic = (topic: number): void => {
    navigate("/forum/" + topic);
  };

  return (
    <table className={style.topicsTable}>
      <thead>
        <tr>
          <th>Topics</th>
          <th>Messages</th>
          <th>User</th>
          <th>Views</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {tempData.map(item => (
          <tr onClick={() => showTopic(item.id)} key={item.id}>
            <th>{item.topic}</th>
            <td>{item.messages}</td>
            <td>
              <div className={style.forum__userWrapper}>
                <div className={style.forum__userWrapper__avatar}>
                  <img src={item.user.avatar} alt="user1" />
                </div>
                <div className={style.forum__userWrapper__name}>
                  by {item.user.name}
                </div>
              </div>
            </td>
            <td>{item.views}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopicsTable;
