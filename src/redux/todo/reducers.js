import * as todoActionTypes    from './actionTypes';

const initialState = {
  todos: [],
  currentTodo: {}
}

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case todoActionTypes.FETCH_ALL_TODO_SUCCESS: {
      return {
        ...state,
        todos: [...action.payload]
      }
    }
    case todoActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case todoActionTypes.CURRENT_TODO_SUCCESS:
      return {
        ...state,
        currentTodo: action.payload
      }
    case todoActionTypes.REMOVE_TODO_SUCCESS: {
      return {
        ...state,
        todos: [...action.payload]
      }
    }
    case todoActionTypes.UPDATE_TODO_SUCCESS: {
      return {
        ...state,
        todos: [...action.payload]
      }
    }
    default:
      return state
  }
}