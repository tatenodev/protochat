import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { User } from "@supabase/supabase-js";

interface userState {
  isLoadingSession: boolean;
  user: User | null;
}

const initialState: userState = {
  isLoadingSession: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoadingSession: (state, action: PayloadAction<boolean>) => {
      state.isLoadingSession = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsLoadingSession, setUser } = userSlice.actions;
export const selectIsLoadingSession = (state: RootState) => state.userInfo;
export default userSlice.reducer;
