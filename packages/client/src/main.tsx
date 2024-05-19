import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";
import "@/assets/styles/main.scss";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>,
);
