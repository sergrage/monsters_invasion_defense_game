import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import style from "./style.module.scss";
import Image from "@/ui/image";

import menuItemBg from "@/assets/img/titleBox.png";

export type TProps = {
  menu: { title: string; route: string }[];
  control?: { route: string; action: any };
};
const GameMenu: FC<TProps> = ({ menu, control }) => {
  const handleLoginClick = (route: string) => {
    if (control && control.route === route.slice(1)) {
      control.action();
    }
  };

  return (
    <div className={style.wrapper}>
      {menu.map((item, index) =>
        control && control.route === item.route.slice(1) ? (
          <NavLink
            className={style.menuItem}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              handleLoginClick(item.route);
            }}
            to={item.route}
            key={index}
            data-route={item.route}
          >
            <Image className={style.menuItemBg} src={menuItemBg}></Image>
            <p className={style.menuItemText}>{item.title}</p>
          </NavLink>
        ) : (
          <NavLink className={style.menuItem} to={item.route} key={index}>
            <Image className={style.menuItemBg} src={menuItemBg}></Image>
            <p className={style.menuItemText}>{item.title}</p>
          </NavLink>
        ),
      )}
    </div>
  );
};

export default GameMenu;
