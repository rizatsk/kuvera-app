import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authUserReducer from "./auth-user/reducer";
import isPreloadReducer from "./preload/reducer";

export const store = configureStore({
  reducer: {
    preload: isPreloadReducer,
    authUser: authUserReducer,
  } as any
});


export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;