import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";
import todoReducer from "../slices/todoSlice";
import { loggerMiddleware } from "../middleware/loggerMiddleware";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;