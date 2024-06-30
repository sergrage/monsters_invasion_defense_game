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

import { createFetchRequest, createUrl } from "./entry-server.utils";
import routes from "./routes";
import { reducer } from "./store";
import { setPageHasBeenInitializedOnServer } from "./store/ssrSlice";
import { Helmet } from "react-helmet";

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

  const url = createUrl(req);

  const foundRoutes = matchRoutes(routes, url);
  if (!foundRoutes) {
    throw new Error("Страница не найдена!");
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

    const helmet = Helmet.renderStatic();

    return {
      html,
      initialState: store.getState(),
      helmet,
    };
  } finally {
    // sheet.seal();
  }
};
