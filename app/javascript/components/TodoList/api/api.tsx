import axios from "axios";

export const selectTodo = async (id: number, checked: boolean) => {
  return await axios.patch(`/todos/${id}`, {
    checked,
  });
};

export const uploadAttachment = async (id: number, formData: FormData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return await axios.patch(`/todos/${id}`, formData, config);
};

export const reset = async () => {
  return await axios.post("/todos/reset");
};
