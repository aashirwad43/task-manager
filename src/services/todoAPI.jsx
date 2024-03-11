const BASE_URL = "https://jsonplaceholder.typicode.com/todos/";

export const getTodos = async () => {
  try {
    const res = await fetch(BASE_URL);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postTodo = async (newTodo) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTodo = async (updatedTodo, editId) => {
  try {
    const response = await fetch(BASE_URL + editId, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
