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

    const clientTodoId = uuidv4();

    const newTodo = {
      id: clientTodoId,
      title: todo,
      completed: false,
      userId: uuidv4(),
    };

    try {
      const createdTodo = await postTodo(newTodo);
      createdTodo.id = clientTodoId; // Replace server-provided id with the one that we generated on client side.
      setTodos([createdTodo, ...todos]);
      setTodo("");
      console.log("new todo:", createdTodo);
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TODO
  const handleEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    // console.log(editTodo);
    setTodo(editTodo.title);
    setEditId(id);
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
    console.log("updated todo:", updatedTodo);

    try {
      const updatedData = await updateTodo(updatedTodo, editId);
      console.log("updated todo response:", updatedData);
      setTodos((prev) =>
        prev.map((task) =>
          task.id === editId ? { ...task, title: updatedData.title } : task
        )
      );
      setTodo("");
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
  const handleComplete = (id) => {
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
        handleComplete={handleComplete}
      />
    </div>
  );
}

export default Todo;
