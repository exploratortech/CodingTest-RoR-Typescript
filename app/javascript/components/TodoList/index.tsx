import React, { useEffect } from "react"
import { Container, ListGroup, Form } from "react-bootstrap"
import { ResetButton } from "./uiComponent"
import axios from "axios"

import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
class Store {
  todoItems = []

  constructor() {
    makeAutoObservable(this)
  }

  setTodoItems(list) {
    this.todoItems = list
  }

  updateItem(item, id) {
    this.todoItems = this.todoItems.map((ele) => (ele.id === id ? item : ele))
  }

  reset() {
    this.todoItems = this.todoItems.map((ele) => {
      return { ...ele, checked: false }
    })
  }
}

const store = new Store()

type TodoItem = {
  id: number
  title: string
  checked: boolean
}

type Props = {
  todoItems: TodoItem[]
}

const TodoList: React.FC<Props> = observer(({ todoItems }) => {
  useEffect(() => {
    store.setTodoItems(todoItems)
    const token = document.querySelector("[name=csrf-token]") as HTMLMetaElement
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content
  }, [])

  const checkBoxOnCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: TodoItem
  ): void => {
    axios
      .post("/todo", {
        id: item.id,
        checked: e.target.checked,
      })
      .then((res) => {
        store.updateItem({ ...item, checked: !item.checked }, item.id)
      })
      .catch((e) => console.error(e))
  }

  const resetButtonOnClick = (): void => {
    axios
      .post("/reset")
      .then((res) => store.reset())
      .catch((e) => console.error(e))
  }

  return (
    <Container>
      <h3>2022 Wish List</h3>
      <ListGroup>
        {store.todoItems.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <Form.Check
              type="checkbox"
              label={todo.title}
              checked={todo.checked}
              onChange={(e) => checkBoxOnCheck(e, todo)}
            />
          </ListGroup.Item>
        ))}
        <ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
      </ListGroup>
    </Container>
  )
})

export default TodoList
