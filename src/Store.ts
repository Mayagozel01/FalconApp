import { configureStore } from "@reduxjs/toolkit";
import layoutsReducer from "./widgets/layouts-manager/layoutsSlice";

const store = configureStore({
  reducer: {
    layouts: layoutsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;