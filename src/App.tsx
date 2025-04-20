import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.min.css";
import store from "./Store";
import "./style.css";
import { LayoutManager } from "./widgets/layouts-manager/LayoutManager";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <LayoutManager />
      </div>
    </Provider>
  );
};

export default App;
