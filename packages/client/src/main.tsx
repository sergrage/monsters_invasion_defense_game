import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import App from "@/App";
import "@/assets/styles/main.scss";
import { Provider } from "react-redux";
import { store } from "./store";
import ErrorBoundary from "@/components/errorBoundary";
import { Toast } from "@/ui/toast";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope,
        );
      })
      .catch((error: string) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <Toast />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>,
);
