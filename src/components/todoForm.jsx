import styles from "../styles/todoForm.module.scss";

function TodoForm({
  todo,
  handleCreateTodo,
  setTodo,
  editId,
  handleUpdateTodo,
}) {
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="add a todo"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          className={styles.addButton}
          type="submit"
          onClick={editId ? handleUpdateTodo : handleCreateTodo}
        >
          {editId ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
