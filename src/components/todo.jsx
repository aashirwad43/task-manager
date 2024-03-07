import { useEffect, useState } from "react";
import styles from "../styles/todo.module.scss";
import Box from "./box";

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
      {todos &&
        todos.map((todo) => {
          return (
            <div className={styles.row} key={todo.id}>
              <Box>
                <h1>{todo.title}</h1>
                <h1>{`${todo.completed}`}</h1>
                {/* <h1>{todo.completed}</h1> */}
              </Box>
            </div>
          );
        })}
    </div>
  );
}

export default Todo;
