import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk                                             from 'redux-thunk';
import authReducer                                       from './auth';
import todoReducer                                       from './todo';
import usersReducer                                      from './users';


const rootReducers = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  users: usersReducer
})


const store = createStore(rootReducers, applyMiddleware(thunk));

store.subscribe(() => {
  console.log("redux state : ", store.getState())
})

export default store;