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
  channelList: ChannelItem[];
  currentChannel: ChannelItem | null;
  profiles: {
    avater_url: string;
    full_name: string;
    id: string;
    update_at: string;
    username: string;
    website: string;
  } | null;
};

const initialState: ChannelState = {
  channelList: [],
  currentChannel: null,
  profiles: null,
};

export const userSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelList: (
      state,
      action: PayloadAction<ChannelState["channelList"]>
    ) => {
      state.channelList = action.payload;
    },
    deleteChannelItem: (state, action: PayloadAction<ChannelItem["id"]>) => {
      const newChannels = state.channelList.filter(
        (item) => item.id !== action.payload
      );
      state.channelList = newChannels;
    },
    setCurrentChannel: (state, action: PayloadAction<ChannelItem>) => {
      state.currentChannel = action.payload;
    },
    setProfiles: (state, action: PayloadAction<ChannelState["profiles"]>) => {
      state.profiles = action.payload;
    },
  },
});

export const {
  setChannelList,
  deleteChannelItem,
  setCurrentChannel,
  setProfiles,
} = userSlice.actions;

export const selectChannelById = (_channelId: string) =>
  createSelector(
    (state: RootState) => state.channel.channelList,
    (list) => list.find((item) => item.id === _channelId)
  );

export default userSlice.reducer;
