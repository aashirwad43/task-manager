import { useEffect, useState } from "react";
import { getTodos, postTodo, updateTodo } from "../services/todoAPI";
import TodoList from "./todoList";
import TodoForm from "./todoForm";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    // FETCH TODO
    const fetchTodos = async () => {
      try {
        const todos = await getTodos(); // wait for promise to resolve & return todos
        setTodos(todos);
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
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TODO
  const handleEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.title);
    setEditId(id);
    // console.log(todo);
  };

  // UPDATE TODO
  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      return;
    }

    const updatedTodo = {
      title: todo,
      completed: false,
    };

    try {
      const updatedData = await updateTodo(updatedTodo, editId);
      setTodos((prev) =>
        prev.map((task) =>
          task.id === editId ? { ...task, title: updatedData.title } : task
        )
      );
      setTodo("");
      console.log("updated todos: ", todos);
      setEditId(0);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TODO
  const handleDelete = (id) => {
    const deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos([...deleteTodo]);
  };

  // GET DATA FROM LOCAL STORAGE
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("list"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  //ADD DATA TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1 style={{ color: "white" }}>Task manager</h1>
      <TodoForm
        todo={todo}
        handleCreateTodo={handleCreateTodo}
        setTodo={setTodo}
        editId={editId}
        handleUpdateTodo={handleUpdateTodo}
      />
      <TodoList
        todos={todos}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Todo;
