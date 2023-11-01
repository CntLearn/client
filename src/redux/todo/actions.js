import * as todoActionTypes from './actionTypes';

const add = (payload) => {
  return {
    type: todoActionTypes.ADD_TODO_SUCCESS,
    payload
  }
}
const update = (payload) => {
  return {
    type: todoActionTypes.CURRENT_TODO_SUCCESS,
    payload
  }
}


export {
  add,
  update
}