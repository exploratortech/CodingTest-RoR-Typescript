import React, { useEffect } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import { ResetButton } from "./uiComponent";
import axios from "axios";

type TodoItem = {
  id: number;
  title: string;
  checked: boolean;
  image: string;
};

type Props = {
  todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = ({ todoItems }) => {
  useEffect(() => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ) as HTMLMetaElement;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  }, []);

  const checkBoxOnCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): void => {
    axios.post("/todo", {
      home: {
        id: todoItemId,
        checked: e.target.checked,
      }
    }).then((res) => {
      let foundIndex = todoItems.findIndex(todo => todo.id == res.data.id);
      todoItems[foundIndex] = res.data.id;
      e.target.checked = res.data.checked;
 });

  };

  const onImageUpload = (event, id) => {
    const data = new FormData();
    data.append("home[image]", event.target.files[0]);
    data.append("home[id]", `${id}`);

    axios.post('todo/', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((res) => {
        let foundIndex = todoItems.findIndex(x => x.id == res.data.id);
        todoItems[foundIndex] = res.data.id;

        const image = document.getElementById(`img_${res.data.id}`) as HTMLImageElement | null;
        image.src = res.data.image;
      });
  };

  const resetButtonOnClick = (): void => {
    axios.post("/reset").then(() => location.reload());
  };

  return (
    <Container>
      <h3>2022 Wish List</h3>
      <ListGroup>
        {todoItems.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <Form.Check
              type="checkbox"
              label={todo.title}
              checked={todo.checked}
              onChange={(e) => checkBoxOnCheck(e, todo.id)}
            />

            <img id={`img_${todo.id}`} 
                 src={todo.image}
                 style={{maxHeight: '100px', maxWidth: '100px'}}/>
            <Form.Control type="file" accept="image/*" multiple={false} onChange={(e) => onImageUpload(e, todo.id)} />
          </ListGroup.Item>
        ))}
        <ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
      </ListGroup>
    </Container>
  );
};

export default TodoList;
