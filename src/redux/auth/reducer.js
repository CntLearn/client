import * as authActionTypes from './actionTypes';

let authInitialState = {
  email: '',
  firstName: '',
  lastName: '',
  fullName: '',
  avatar: '',
  about: '',
  lastSeen: '',
  lastMessage: '',
  isLogin: !!JSON.parse(localStorage.getItem('user'))?.token
}

authInitialState = { ...authInitialState, ...JSON.parse(localStorage.getItem('user')) }

console.log('auth state : ', authInitialState)
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
        ...state,
        ...authInitialState
      }
    default:
      return state;
  }
}