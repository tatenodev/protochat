import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "store";

type ChannelItem = {
  created_at: string;
  id: string;
  is_public: boolean;
  name: string;
  user: string;
};

type ChannelState = {
  list: ChannelItem[];
};

const initialState: ChannelState = {
  list: [],
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
  },
});

export const { setChannelList, deleteChannelItem } = userSlice.actions;
export default userSlice.reducer;
