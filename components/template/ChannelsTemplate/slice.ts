import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";

type ChannelState = {
  createChannel: {
    isPublic: boolean;
    name: string;
  };
};

const initialState: ChannelState = {
  createChannel: {
    isPublic: false,
    name: "",
  },
};

export const userSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setIsPublic: (state, action: PayloadAction<boolean>) => {
      state.createChannel.isPublic = action.payload;
    },
    clearCreateChannelInput: (state) => {
      state.createChannel = initialState.createChannel;
    },
  },
});

export const { setIsPublic, clearCreateChannelInput } = userSlice.actions;
export default userSlice.reducer;
