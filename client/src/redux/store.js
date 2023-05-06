import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import memoReducer from "./features/memoSlice";

//レッスン70-73

//すでに作成済みのアプリにインストールする
//https://redux-toolkit.js.org/introduction/getting-started#an-existing-app

//storeの作り方
//https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-store
export const store = configureStore({
  reducer: { user: userReducer, memo: memoReducer },
});
