import { Request, Response, NextFunction } from "express";

export const auth = (_: Request, res: Response, next: NextFunction) => {
  try {
    // тут логика проверки того, что пользователь авторизтрован
    // обращение к yandex API и пропуск дальше или выброс исключения
    next();
  } catch {
    res.status(403).json({
      msg: "Invalid request!",
      status: 403,
    });
  }
};
