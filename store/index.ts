import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./sessionSlice";
import channelReducer from "components/template/ChannelsTemplate/slice";

export const store = configureStore({
  reducer: {
    session: userReducer,
    channel: channelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
