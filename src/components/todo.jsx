import { useEffect, useState } from "react";
import styles from "../styles/todo.module.scss";
import Box from "./box";
import Navbar from "./Navbar";
import StatusIndicator from "./statusIndicator";
// import { v4 as uuidv4 } from "uuid";
import { getTodos, postTodo } from "../services/todoAPI";
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
        console.log(todos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  // ADD TODO
  const handleCreateTodo = async (e) => {
    // if (editId) {
    //   const editTodo = todos.find((todo) => todo.id === editId);
    //   const updatedTodoList = todos.map((todo) =>
    //     todo.id === editTodo.id
    //       ? (todo = { id: todo.id, title, completed: false })
    //       : { id: todo.id, title: todo.title, completed: todo.completed }
    //   );
    //   setTodos(updatedTodoList);
    //   setEditId(0);
    //   return;
    // }

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

  // EDIT TODO
  const handleEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.title);
    setEditId(id);
    console.log(todo);
  };

  // UPDATE TASK
  const handleUpdateTodo = async () => {
    if (todo.trim() === "") {
      return;
    }

    const updatedTodo = {
      title: todo,
      completed: false,
    };

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${editId}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedTodo),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const updatedData = await response.json();
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, title: updatedData.title } : todo
        )
      );
      setTodo("");
      setEditId(null);
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
    <div className={styles.outerDiv}>
      <Navbar />
      {todos &&
        todos.map((todo) => {
          return (
            <div className={styles.row} key={todo.id}>
              <div className={styles.col}>
                <Box>
                  <StatusIndicator status={todo.completed} />
                  <div className={styles.title}>{todo.title}</div>
                  {/* <div>Completed: {`${todo.completed}`}</div> */}
                </Box>
              </div>
            </div>
          );
        })}
      {/* <div>
      <h1 style={{ color: "white" }}>Task manager</h1>
      <TodoForm
        todo={todo}
        handleCreateTodo={handleCreateTodo}
        setTodo={setTodo}
        editId={editId}
      />
      <TodoList
        todos={todos}
        handleEdit={handleEdit}
        handleUpdateTodo={handleUpdateTodo}
        handleDelete={handleDelete}
      /> */}
    </div>
  );
}

export default Todo;
