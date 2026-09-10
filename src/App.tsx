import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import {
  increment,
  decrement,
  reset,
} from "./slices/counterSlice";
import {
  addTodo,
  removeTodo,
  toggleTodo,
} from "./slices/todoSlice";
import { todoSelectors } from "./slices/todoSelectors";
function App() {
  const dispatch = useDispatch();
  // Counter state
  const count = useSelector(
    (state: RootState) => state.counter.value
  );
  // Todo state
  const todos = useSelector((state: RootState) =>
    todoSelectors.selectAll(state)
  );
  const [todoTitle, setTodoTitle] = useState("");
  const handleAddTodo = () => {
    if (!todoTitle.trim()) {
      return;
    }
    dispatch(
      addTodo({
        id: Date.now(),
        title: todoTitle,
        completed: false,
      })
    );
    setTodoTitle("");
  };
  return (
    <div style={{ padding: "30px", maxWidth: "600px" }}>
      <h1>Redux Practice</h1>
      {/* Counter */}
      <section>
        <h2>Counter</h2>
        <h3>{count}</h3>
        <button onClick={() => dispatch(increment())}>
          +
        </button>
        <button onClick={() => dispatch(decrement())}>
          -
        </button>
        <button onClick={() => dispatch(reset())}>
          Reset
        </button>
      </section>
      <hr />
      {/* Todo */}
      <section>
        <h2>Todo List</h2>
        <input
          type="text"
          placeholder="Enter todo"
          value={todoTitle}
          onChange={(event) =>
            setTodoTitle(event.target.value)
          }
        />
        <button onClick={handleAddTodo}>
          Add
        </button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
              />
              <span
                style={{
                  textDecoration: todo.completed
                    ? "line-through"
                    : "none",
                  margin: "0 10px",
                }}
              >
                {todo.title}
              </span>

              <button
                onClick={() => dispatch(removeTodo(todo.id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
export default App;