import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { User } from "@supabase/supabase-js";

interface CounterState {
  isLoadingSession: boolean;
  user: User | null;
}

const initialState: CounterState = {
  isLoadingSession: false,
  user: null,
};

export const counterSlice = createSlice({
  name: "root",
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

export const { setIsLoadingSession, setUser } = counterSlice.actions;
export const selectIsLoadingSession = (state: RootState) =>
  state.root.isLoadingSession;
export default counterSlice.reducer;
