import styles from "../styles/todo.module.scss";
import Box from "./box";

function TodoList({ todos, handleEdit, handleUpdateTodo, handleDelete }) {
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
                </Box>
                <button onClick={() => handleEdit(todo.id)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TodoList;
