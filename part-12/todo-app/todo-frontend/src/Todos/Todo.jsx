const Todo = ({ todo, onClickDelete, onClickComplete }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "70%",
        margin: "auto",
      }}
    >
      <span>{todo.text}</span>
      <span>{todo.done ? "This todo is done" : "This todo is not done"}</span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
        {!todo.done && (
          <button onClick={onClickComplete(todo)}> Set as done </button>
        )}
      </span>
    </div>
  );
};

export default Todo;
