import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "store";

type ChannelState = {
  list: {
    created_at: string;
    id: string;
    is_public: boolean;
    name: string;
    user: string;
  }[];
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
  },
});

export const { setChannelList } = userSlice.actions;
export default userSlice.reducer;
