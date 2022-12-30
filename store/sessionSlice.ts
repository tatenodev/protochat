import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { User } from "@supabase/supabase-js";

interface sessionState {
  isLoadingSession: boolean;
  user: User | null;
}

const initialState: sessionState = {
  isLoadingSession: false,
  user: null,
};

export const userSlice = createSlice({
  name: "session",
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
export const selectIsLoadingSession = (state: RootState) => state.session;
export default userSlice.reducer;
