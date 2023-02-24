//import "./App.css";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { CreateButton } from "./components/CreateButton";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";

const todos = [
  { text: "Cortar Cebolla", completed: true },
  { text: "Moler Cebolla", completed: false },
  { text: "Picar Cebolla", completed: false },
];

function App() {
  return (
    <>
      <TodoCounter />

      <TodoSearch />

      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>

      <CreateButton />
    </>
  );
}

export default App;
