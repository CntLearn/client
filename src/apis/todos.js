import customAxios from './api';

const add = (todo) => {
  return customAxios.post('/todos', todo);
}

const deletePermanent = (id) => {
  return customAxios.delete(`/todos/${ id }`);
}

const update = (id, todo) => {
  return customAxios.put(`/todos/${ id }`, todo);
}

const fetchAllTodos = () => {
  return customAxios.get('/todos');
}

export {
  add,
  deletePermanent,
  fetchAllTodos,
  update
}