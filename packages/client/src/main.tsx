import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import App from "@/App";
import "@/assets/styles/main.scss";
import { Provider } from "react-redux";
import { store } from "./store";
import ErrorBoundary from "@/components/errorBoundary";
import { Toast } from "@/ui/toast";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <BrowserRouter>
    <Provider store={store}>
      <Toast />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>,
);
