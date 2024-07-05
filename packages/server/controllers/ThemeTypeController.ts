import { Request, Response } from "express";

import ThemeType from "../models/ThemeType";

export const getUserThemeType = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.user_id);
  let themeType = await ThemeType.findOne({
    where: { user_id: user_id },
  });

  if (!themeType) {
    // если нет темы в БД - то создаем дефолтную
    themeType = await ThemeType.create({
      user_id: user_id,
    });
  }
  return res.json(themeType);
};

export const storeThemeType = async (req: Request, res: Response) => {
  try {
    const newThemeType = await ThemeType.create({
      theme_type: req.body.theme_type,
      user_id: req.body.user_id,
    });
    return res.status(200).json(newThemeType); //create success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const updateThemeType = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.user_id);
  console.log(user_id);
  try {
    await ThemeType.update(
      { theme_type: req.body.theme_type },
      {
        where: {
          user_id: user_id,
        },
      },
    );
    return res.status(204).json({ status: "success" }); //update success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};
