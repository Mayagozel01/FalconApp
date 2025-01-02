// store.js
import { configureStore } from "@reduxjs/toolkit";
import { todos } from "./reducers";

const store = configureStore({
  reducer: { todos: todos },
});

export default store;