import { useEffect, useState } from "react";
import styles from "../styles/todo.module.scss";
import Box from "./box";
import Navbar from "./Navbar";
import StatusIndicator from "./statusIndicator";

function Todo() {
  const [todos, setTodos] = useState();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTodos();
    console.log(todos);
  }, []);

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
    </div>
  );
}

export default Todo;
