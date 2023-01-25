import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("Todo component renders correctly", () => {
  const todo = {
    id: 1,
    text: "Test todo",
    done: false,
  };
  const onClickDelete = jest.fn();
  const onClickComplete = jest.fn();

  render(
    <Todo
      todo={todo}
      onClickDelete={onClickDelete}
      onClickComplete={onClickComplete}
    />
  );

  expect(screen.getByText(todo.text)).toBeInTheDocument();
  expect(screen.getByText("Delete")).toBeInTheDocument();
  expect(screen.getByText("Set as done")).toBeInTheDocument();
});
