import { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { getTodos, postTodo } from "../services/todoAPI";
import TodoList from "./todoList";
import TodoForm from "./todoForm";

function Todo() {
  const [todos, setTodos] = useState();
  const [todo, setTodo] = useState("");

  useEffect(() => {
    // FETCH TODO
    const fetchTodos = async () => {
      try {
        const todos = await getTodos(); // wait for promise to resolve & return todos
        setTodos(todos);
        console.log(todos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  // ADD TODO
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      return;
    }

    const newTodo = {
      title: todo,
      completed: false,
    };

    try {
      const createdTodo = await postTodo(newTodo);
      setTodos([...todos, createdTodo]);
      setTodo("");
      console.log(todos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>Task manager</h1>
      <TodoForm
        todo={todo}
        handleCreateTodo={handleCreateTodo}
        setTodo={setTodo}
      />
      <TodoList todos={todos} />
    </div>
  );
}

export default Todo;
