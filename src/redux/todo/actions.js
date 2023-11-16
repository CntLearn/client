import Toaster, { HandleError } from '../../utils';
import * as todoActionTypes     from './actionTypes';
import * as API                 from '../../apis';

const add = (todo) => {
  return (dispatch) => {
    return API.add(todo)
      .then(res => {
        const addedTodo = res.data.data.todo;
        dispatch({
          type: todoActionTypes.ADD_TODO_SUCCESS,
          payload: addedTodo
        })
        Toaster('Task Added Successfully', 'success');
        return true;
      })
      .catch(err => {
        HandleError(err);
        return false
      })
  }
}

const deletePermanent = (id) => {
  return (dispatch, getState) => {
    return API.deletePermanent(id)
      .then(res => {
        const { deletedCount = 0 } = res.data.data.todo;
        if (deletedCount > 0) {
          Toaster('Task Deleted Successfully', 'success');
          const list = getState().todos.todos.filter(todo => todo._id !== id);
          dispatch({
            type: todoActionTypes.REMOVE_TODO_SUCCESS,
            payload: list
          })
          return true;
        }
        return false
      })
      .catch(err => {
        HandleError(err);
        return false
      })
  }
}
// alqayoom
// 0321 48 64 807

const fetchAllTodos = () => {
  return (dispatch) => {
    return API.fetchAllTodos()
      .then(res => {
        const list = res.data.data.list;
        dispatch({
          type: todoActionTypes.FETCH_ALL_TODO_SUCCESS,
          payload: Array.isArray(list) && list.length > 0 ? list : []
        })
        return true;
      })
      .catch(err => {
        HandleError(err);
        return false
      })
  }
}


const update = (id, todo) => {
  return (dispatch, getState) => {
    return API.update(id, todo)
      .then(res => {
        const { modifiedCount = 0 } = res.data.data.todo;
        if (modifiedCount > 0) {
          Toaster('Task Updated Successfully', 'success');
          const list = getState().todos.todos.map(to => {
            if (to._id === id) {
              return {
                _id: id,
                ...todo
              };
            }
            else return to
          });

          dispatch({
            type: todoActionTypes.UPDATE_TODO_SUCCESS,
            payload: list
          })
          return true;
        }
        return false
      })
      .catch(err => {
        HandleError(err);
        return false
      })
  }


}


export {
  add,
  deletePermanent,
  fetchAllTodos,
  update
}