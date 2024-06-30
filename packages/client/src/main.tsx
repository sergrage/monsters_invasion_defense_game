import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import dataRoutes from "./routes";
import ErrorBoundary from "@/components/errorBoundary";
import { Toast } from "@/ui/toast";

import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/main.scss";

const router = createBrowserRouter(dataRoutes);

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Provider store={store}>
    <Toast />
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </Provider>,
);
