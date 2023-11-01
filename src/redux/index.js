import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk                                             from 'redux-thunk';
import authReducer                                       from './auth';
import todoReducer                                       from './todo';


const rootReducers = combineReducers({
  auth: authReducer,
  todos: todoReducer
})


const store = createStore(rootReducers, applyMiddleware(thunk));

store.subscribe(() => {
  console.log("state : ", store.getState())
})

export default store;