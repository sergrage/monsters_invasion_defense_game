import ReactDOM from "react-dom/server";
// import { Provider } from "react-redux";
// import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { Request as ExpressRequest } from "express";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { matchRoutes } from "react-router-dom";
// import { configureStore } from "@reduxjs/toolkit";

import { createFetchRequest, createUrl } from "./entry-server.utils";

// import { reducer } from "./store";
import routes from "./routes";
// import "./index.css";
// import { setPageHasBeenInitializedOnServer } from "./slices/ssrSlice";

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  // const store = configureStore({
  //   reducer,
  // });

  const url = createUrl(req);

  const foundRoutes = matchRoutes(routes, url);
  console.log("🚀 ~ render ~ routes:", routes);
  console.log("🚀 ~ render ~ foundRoutes:", foundRoutes);
  if (!foundRoutes) {
    throw new Error("Страница не найдена!");
  }

  // const [
  //   {
  //     route: { fetchData },
  //   },
  // ] = foundRoutes;

  // try {
  //   await fetchData({
  //     dispatch: store.dispatch,
  //     state: store.getState(),
  //     ctx: createContext(req),
  //   });
  // } catch (e) {
  //   console.log("Инициализация страницы произошла с ошибкой", e);
  // }

  // store.dispatch(setPageHasBeenInitializedOnServer(true));

  const router = createStaticRouter(dataRoutes, context);
  // const sheet = new ServerStyleSheet();
  try {
    const html = ReactDOM.renderToString(
      // sheet.collectStyles(
      <StaticRouterProvider router={router} context={context} />,
      // ),
    );
    // const styleTags = sheet.getStyleTags();

    const helmet = Helmet.renderStatic();

    return {
      html,
      helmet,
      // styleTags,
    };
  } finally {
    // sheet.seal();
  }
};
