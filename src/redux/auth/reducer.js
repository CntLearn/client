import * as authActionTypes from './actionTypes';

let authInitialState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  fullName: '',
  avatar: '',
  about: '',
  lastSeen: '',
  lastMessage: '',
  isLogin: false
}


export default function authReducer(state = authInitialState, action) {

  switch (action.type) {
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case authActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        ...authInitialState
      }

    case authActionTypes.LOGOUT_SUCCESS:
      return {
        state: action.payload
      }
    default:
      return state;
  }
}