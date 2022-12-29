import { createSlice, current, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";

export type ChannelItem = {
  created_at: string;
  id: string;
  is_public: boolean;
  logs:
    | {
        date: string;
        message: string;
      }[]
    | null;
  name: string;
  user: string;
};

type ChannelState = {
  list: ChannelItem[];
  currentChannel: ChannelItem | null;
};

const initialState: ChannelState = {
  list: [],
  currentChannel: null,
};

export const userSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelList: (state, action: PayloadAction<ChannelState["list"]>) => {
      state.list = action.payload;
    },
    deleteChannelItem: (state, action: PayloadAction<ChannelItem["id"]>) => {
      const newChannels = state.list.filter(
        (item) => item.id !== action.payload
      );
      state.list = newChannels;
    },
    setCurrentChannel: (state, action: PayloadAction<ChannelItem>) => {
      state.currentChannel = action.payload;
    },
  },
});

export const { setChannelList, deleteChannelItem, setCurrentChannel } =
  userSlice.actions;

export const selectChannelById = (_channelId: string) =>
  createSelector(
    (state: RootState) => state.channel.list,
    (list) => list.find((item) => item.id === _channelId)
  );

export default userSlice.reducer;
