import type { Middleware } from "@reduxjs/toolkit";
export const loggerMiddleware: Middleware =
  (store) => (next) => (action) => {
    console.log("Action:", action);
    console.log("Previous State:", store.getState());
    const result = next(action);
    console.log("Next State:", store.getState());
    return result;
  };