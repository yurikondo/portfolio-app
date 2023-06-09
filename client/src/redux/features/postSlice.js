//https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
