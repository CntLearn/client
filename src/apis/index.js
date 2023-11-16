// users imports
import { registerUser, login, fetchAll } from './users';

// todos imports
import { add, fetchAllTodos, deletePermanent, update } from './todos'

export {
  // users exports
  registerUser,
  login,
  fetchAll,

  // todos imports
  add,
  deletePermanent,
  fetchAllTodos,
  update
}