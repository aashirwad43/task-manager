import styles from "../styles/todo.module.scss";
import Box from "./box";
import StatusIndicator from "./statusIndicator";
import edit from "../assets/edit.png";
import deleteImg from "../assets/delete.png";

function TodoList({ todos, handleEdit, handleDelete, handlecomplete }) {
  return (
    <div className={styles.eachTodoDiv}>
      {todos &&
        todos.map((todo) => {
          return (
            <div className={styles.row} key={todo.id}>
              <Box>
                <StatusIndicator
                  onClick={() => handlecomplete(todo.id)}
                  status={todo.completed}
                />
                {/* <div className={styles.title}>{todo.title}</div> */}
                <div
                  className={`${styles.title} ${
                    todo.completed ? styles.complete : ""
                  }`}
                >
                  {todo.title}
                </div>

                <img
                  onClick={() => !todo.completed && handleEdit(todo.id)}
                  className={styles.editImg}
                  src={edit}
                />
                <img
                  onClick={() => handleDelete(todo.id)}
                  className={styles.deleteImg}
                  src={deleteImg}
                />
              </Box>
              {/* <button onClick={() => handleEdit(todo.id)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button> */}
            </div>
          );
        })}
    </div>
  );
}

export default TodoList;
