import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes";

dotenv.config();

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

import { dbInit } from "./db";

interface IOptions extends Options {
  onError?: (err: Error, req: Request, res: Response) => void;
  onProxyRes?: (proxyRes: any, req: Request, res: Response) => void;
  onProxyReq?: (proxyReq: any, req: Request, res: Response) => void;
}

const app = express();
app.use(
  cors({
    // Разрешение запросов только с этого домена
    origin: "https://your-local-domain.test",
    // Разрешение передачи cookies и авторизационных заголовков
    credentials: true,
  }),
);

app.use(
  // прокси будет работать для всех маршрутов, начинающихся с "/api/v2"
  "/api/v2",
  createProxyMiddleware({
    // Целевой сервер, к которому будут перенаправляться запросы
    target: "https://ya-praktikum.tech/api/v2",

    // Изменяет origin заголовок запроса на target URL
    changeOrigin: true,
    // Переписывает домен в cookies, чтобы они подходили для вашего домена
    cookieDomainRewrite: { "*": "" },

    // Выполняется для каждого запроса
    onProxyReq: proxyReq => {
      // Устанавливает заголовок Origin, чтобы он соответствовал локальному серверу
      proxyReq.setHeader("Origin", "http://localhost:3000");
    },

    // Выполняется для каждого ответа
    onProxyRes: function (proxyRes) {
      // Разрешает доступ к ресурсу с вашего локального сервера
      proxyRes.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";

      // Разрешает отправку cookies и авторизационных заголовков с запросом
      proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
    },

    onError: (err, req, res) => {
      console.error("Proxy error:", err.message);
      console.error("Request URL:", req.url);
      console.error("Request Headers:", req.headers);
      res.status(500).send("Proxy error");
    },

    // Логирует сообщения
    logger: console,
  } as IOptions),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = Number(process.env.SERVER_PORT) || 3001;

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});

app.use("/api", routes);

dbInit();
