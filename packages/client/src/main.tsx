import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";
import "@/assets/styles/main.scss";
import { Provider } from "react-redux";
import { Store } from "@reduxjs/toolkit";
import { ApplicationStore, createApplicationStore } from "@/store";
import ErrorBoundary from "@/components/errorBoundary";

const store: Store<ApplicationStore> = createApplicationStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>,
);
