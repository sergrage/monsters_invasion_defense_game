import dotenv from "dotenv";
dotenv.config();

import fs from "fs/promises";
import { createServer as createViteServer, ViteDevServer } from "vite";
import express, { Request as ExpressRequest } from "express";
import path from "path";
import { HelmetData } from "react-helmet";

const port = process.env.PORT || 80;
const clientPath = path.join(__dirname, "..");
const isDev = process.env.NODE_ENV === "development";

async function createServer() {
  const app = express();

  let vite: ViteDevServer | undefined;
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      express.static(path.join(clientPath, "dist/client"), { index: false }),
    );
  }

  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Получаем файл client/index.html который мы правили ранее
      // Создаём переменные
      let render: (
        req: ExpressRequest,
      ) => Promise<{ html: string; emotionCss: string; helmet: HelmetData }>;
      let template: string;
      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, "index.html"),
          "utf-8",
        );
        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template);

        // Загружаем модуль клиента, который писали выше,
        // он будет рендерить HTML-код
        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, "src/entry-server.tsx"),
          )
        ).render;
      } else {
        template = await fs.readFile(
          path.join(clientPath, "dist/client/index.html"),
          "utf-8",
        );

        // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(
          clientPath,
          "dist/server/entry-server.js",
        );

        // Импортируем этот модуль и вызываем с инишл стейтом
        render = (await import(pathToServer)).render;
      }

      // Получаем HTML-строку из JSX
      const { html: appHtml, emotionCss, helmet } = await render(req);

      // Заменяем комментарий на сгенерированную HTML-строку
      const html = template
        .replace(
          `<!--ssr-helmet-->`,
          `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`,
        )
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--ssr-css-->`, emotionCss);

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e as Error);
      } else {
        console.error(e);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`);
  });
}

createServer();
