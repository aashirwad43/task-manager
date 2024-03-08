import styles from "../styles/todo.module.scss";
import Box from "./box";

function TodoList({ todos }) {
  return (
    <div>
      <div className={styles.outerDiv}>
        {todos &&
          todos.map((todo) => {
            return (
              <div className={styles.row} key={todo.id}>
                <Box>
                  <p>{todo.title}</p>
                  <p>{`${todo.completed}`}</p>
                  {/* <h1>{todo.completed}</h1> */}
                </Box>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TodoList;
