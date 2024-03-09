import { useEffect, useState } from "react";
import styles from "../styles/todo.module.scss";
import Navbar from "./Navbar";
import { getTodos, postTodo, updateTodo } from "../services/todoAPI";
import TodoList from "./todoList";
import TodoForm from "./todoForm";
import { v4 as uuidv4 } from "uuid";

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
        console.log(todos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
    loadTodosFromLocalStorage();
  }, []);

  // SAVE TODOS TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // LOAD TODO FROM LOCAL STORAGE
  const loadTodosFromLocalStorage = () => {
    const data = localStorage.getItem("todos");
    if (data !== null) setTodos(JSON.parse(data));
    console.log(todos);
  };

  // ADD TODO
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      return;
    }

    const newTodo = {
      title: todo,
      completed: false,
      userId: uuidv4(),
    };

    try {
      const createdTodo = await postTodo(newTodo);
      setTodos([createdTodo, ...todos]);
      setTodo("");
      console.log("after adding:", todos);
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
    console.log(todos);
  };

  // COMPLETE TODO
  const handlecomplete = (id) => {
    const completedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(completedTodo);
  };

  return (
    <div className={styles.outerDiv}>
      <Navbar />
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
        handlecomplete={handlecomplete}
      />
    </div>
  );
}

export default Todo;
