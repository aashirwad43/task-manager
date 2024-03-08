import styles from "../styles/todo.module.scss";
import Box from "./box";
import StatusIndicator from "./statusIndicator";
import edit from "../assets/edit.png";
import deleteImg from "../assets/delete.png";

function TodoList({ todos, handleEdit, handleUpdateTodo, handleDelete }) {
  return (
    <div className={styles.eachTodoDiv}>
      {todos &&
        todos.map((todo) => {
          return (
            <div className={styles.row} key={todo.id}>
              <Box>
                <StatusIndicator status={todo.completed} />
                <div className={styles.title}>{todo.title}</div>
                {/* <div>Completed: {`${todo.completed}`}</div> */}

                <a onClick={() => handleEdit(todo.id)}>
                  <img className={styles.editImg} src={edit} />
                </a>
                <a onClick={() => handleDelete(todo.id)}>
                  <img className={styles.editImg} src={deleteImg} />
                </a>
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
