import ReactDOM from "react-dom/server";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { Request as ExpressRequest } from "express";

import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { matchRoutes } from "react-router-dom";

import {
  createContext,
  createFetchRequest,
  createUrl,
} from "./entry-server.utils";

import { reducer } from "./store";
import { getUserThunk } from "@/store/user/actions";
import { setPageHasBeenInitializedOnServer } from "./store/ssrSlice";

import routes from "./routes";

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const store = configureStore({
    reducer,
  });
  await store.dispatch(getUserThunk());

  const url = createUrl(req);

  const foundRoutes = matchRoutes(routes, url);
  console.log("🚀 ~ render ~ routes:", routes);
  console.log("🚀 ~ render ~ foundRoutes:", foundRoutes);
  if (!foundRoutes) {
    throw new Error("Страница не найдена!");
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes;

  try {
    await fetchData({
      dispatch: store.dispatch,
      state: store.getState(),
      ctx: createContext(req),
    });
  } catch (e) {
    console.log("Инициализация страницы произошла с ошибкой", e);
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true));

  const router = createStaticRouter(dataRoutes, context);

  try {
    const html = ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />,
      </Provider>,
    );
    // const styleTags = sheet.getStyleTags();

    return {
      html,
      initialState: store.getState(),
    };
  } finally {
    // sheet.seal();
  }
};
