import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export const todoAdapter = createEntityAdapter<Todo>();
const initialState = todoAdapter.getInitialState();
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      todoAdapter.addOne(state, action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<{
        id: number;
        changes: Partial<Todo>;
      }>
    ) => {
      todoAdapter.updateOne(state, action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      todoAdapter.removeOne(state, action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.entities[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});
export const {
  addTodo,
  updateTodo,
  removeTodo,
  toggleTodo,
} = todoSlice.actions;
export default todoSlice.reducer;