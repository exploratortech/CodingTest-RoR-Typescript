import React, { useEffect, useState } from "react";
import { Container, ListGroup, Form, ProgressBar } from "react-bootstrap";
import { ResetButton } from "./uiComponent";
import axios from "axios";

type TodoItem = {
  id: number;
  title: string;
  checked: boolean;
  created_at: Date;
};

type Props = {
  todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = ({ todoItems }) => {
  const [todoItemsState, setTodoItemsState] = useState(todoItems)
  const [progressBar, setProgressBar] = useState(0);
  useEffect(() => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ) as HTMLMetaElement;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  }, []);

  const checkBoxOnCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number,
  ): void => {
    axios.post("/todo", {
      id: todoItemId,
      checked: e.target.checked,
    });
    const newState = todoItemsState.map(obj => {
      if(obj.id == todoItemId){
        return {...obj, checked: !obj.checked}
      }else{
        return obj;
      }
    })
    setTodoItemsState(newState);
  };

  const resetButtonOnClick = (): void => {
    axios.post("/reset").then(() => location.reload());
  };

  useEffect(() => {
    const progressItem = [];
    todoItemsState.map(item => {
      if(item.checked){
        progressItem.push(item)
      }
    })
    setProgressBar((progressItem.length/todoItemsState.length)*100)
  }, [todoItemsState])

  return (
    <Container>
      <h3>2022 Wish List</h3>
      <ListGroup>
        {todoItemsState.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <Form.Check
              type="checkbox"
              label={todo.title}
              checked={todo.checked}
              onChange={(e) => checkBoxOnCheck(e, todo.id)}
            />
          </ListGroup.Item>
        ))}
        <br />
        <ProgressBar variant="success" now={progressBar}/>
        <ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
      </ListGroup>
    </Container>
  );
};

export default TodoList;
