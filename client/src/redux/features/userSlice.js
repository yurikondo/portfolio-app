//https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice
//レッスン70-73
import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
