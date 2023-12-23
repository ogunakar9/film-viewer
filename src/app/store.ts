import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import filmReducer from "../features/film/filmSlice";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    films: filmReducer,
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
