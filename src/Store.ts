import { configureStore } from "@reduxjs/toolkit";
import layoutsReducer from "./widgets/layouts-manager/layoutsSlice";

const store = configureStore({
  reducer: {
    layouts: layoutsReducer,
  },
});

export default store;
