import { useState } from "react";
//import "./App.css";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { CreateButton } from "./components/CreateButton";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";

/* const defaultTodos = [
  { text: "Cortar Cebolla", completed: true },
  { text: "Moler Cebolla", completed: false },
  { text: "Picar Cebolla", completed: false },
]; */
function useLocalStorage(itemName, initialValue) {
  const localStorageItems = localStorage.getItem(itemName);
  let parsedItems;

  if (!localStorageItems) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItems = initialValue;
  } else {
    parsedItems = JSON.parse(localStorageItems);
  }
  const [item, setItem] = useState(parsedItems);

  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  };

  return [item, saveItem];
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [todos, savedTodos] = useLocalStorage("TODOS_V1", []);

  const todosCompleted = todos.filter((todo) => todo.completed).length;
  const totalTodos = todos.length;
  //console.log(todosCompleted, totalTodos);

  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const completeTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };
  const deleteTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <>
      <TodoCounter total={totalTodos} completed={todosCompleted} />

      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodos(todo.text)}
            onDelete={() => deleteTodos(todo.text)}
          />
        ))}
      </TodoList>

      <CreateButton />
    </>
  );
}

export default App;
