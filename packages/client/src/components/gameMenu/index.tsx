import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import style from "./style.module.scss";
import Image from "@/ui/image";

import menuItemBg from "@/assets/img/titleBox.png";

export type TProps = {
  menu: { title: string; route: string }[];
};
const GameMenu: FC<TProps> = ({ menu }) => {
  return (
    <div className={style.wrapper}>
      {menu.map(item => (
        <NavLink className={style.menuItem} to={item.route}>
          <Image className={style.menuItemBg} src={menuItemBg}></Image>
          <p className={style.menuItemText}>{item.title}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default GameMenu;
