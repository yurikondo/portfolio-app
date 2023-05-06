import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    {/* redux-toolkitのstoreをどこでも使えるようにする */}
    {/* https://redux-toolkit.js.org/tutorials/quick-start#provide-the-redux-store-to-react */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
