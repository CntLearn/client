import todoReducer                                     from './reducers';
import { add, fetchAllTodos, deletePermanent, update } from './actions';

export {
  add,
  deletePermanent,
  fetchAllTodos,
  update
}

export default todoReducer;