import { todoAdapter } from "./todoSlice";
import type { RootState } from "../store/store";
export const todoSelectors =
  todoAdapter.getSelectors((state: RootState) => state.todos);