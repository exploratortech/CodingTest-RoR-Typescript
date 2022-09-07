import React, { useEffect, useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import axios from "axios";

import { ResetButton, FileInput, ListGroupItem } from "./styles";
import { reset, selectTodo, uploadAttachment } from "./api/api";

type TodoItem = {
  id: number;
  title: string;
  checked: boolean;
};

type Props = {
  todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = ({ todoItems }) => {
  const [todoList, setTodoList] = useState<TodoItem[]>(todoItems);

  useEffect(() => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ) as HTMLMetaElement;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  }, []);

  const checkBoxOnCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): Promise<void> => {
    try {
      const data = await selectTodo(todoItemId, e.target.checked);
      const todoItemIndex = todoList.findIndex(
        (todo) => todo.id === todoItemId
      );
      const updatedTodoList = [...todoList];
      updatedTodoList[todoItemIndex].checked =
        !updatedTodoList[todoItemIndex].checked;
      setTodoList([...updatedTodoList]);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): void => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", file.name);

    uploadAttachment(todoItemId, formData);
  };

  const resetButtonOnClick = async (): Promise<void> => {
    const data = await reset();
    const updatedTodoList = todoList.map((todo) => ({
      ...todo,
      checked: false,
    }));
    setTodoList([...updatedTodoList]);
  };

  return (
    <Container>
      <h3>2022 Wish List</h3>
      <ListGroup>
        {todoList.map((todo) => (
          <ListGroupItem key={todo.id}>
            <Form.Check
              type="checkbox"
              label={todo.title}
              checked={todo.checked}
              onChange={(e) => checkBoxOnCheck(e, todo.id)}
            />
            <FileInput
              type="file"
              size="sm"
              onChange={(e) => uploadFile(e, todo.id)}
            />
          </ListGroupItem>
        ))}
        <ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
      </ListGroup>
    </Container>
  );
};

export default TodoList;
