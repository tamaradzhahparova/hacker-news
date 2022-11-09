import { configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {postsSlice} from "./postsSlice";

const store = configureStore({
  reducer: {
    postsSlice: postsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
