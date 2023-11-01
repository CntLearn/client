import Toaster, { HandleError } from '../../utils';
import handleError              from '../../utils/handleError';
import * as authActionTypes     from './actionTypes';
import * as API                 from '../../apis'

const login = (user) => {
  return (dispatch) => {
    return API.login(user)
      .then(res => {
        if (res.status === 200 && !res.data.success) {
          Toaster(res.data.error.message, 'warning', 3000);
          return false;
        }
        let { token, user } = res.data.data;
        user = { ...user, token }
        Toaster('Successfully Logged in', 'success');
        localStorage.setItem('user', JSON.stringify(user))

        dispatch({
          type: authActionTypes.LOGIN_SUCCESS,
          payload: {
            ...user,
            isLogin: !!JSON.parse(localStorage.getItem('user')).token
          }
        })
        return true;
      })
      .catch(err => {
        HandleError(err)
        return false;
      })
  }
}

const registerUser = (user) => {
  return (dispatch) => {
    return API.registerUser(user)
      .then(response => {
        if (response.status === 200 && !response.data?.success) {
          Toaster(response.data.error.message, 'warning', 3000);
          return false;
        }
        return true;
      })
      .catch(err => {
        handleError(err);
        return false;
      })
  }
}

const logout = () => {
  return {
    type: authActionTypes.LOGOUT_SUCCESS,
    payload: {}
  }
}

export {
  login,
  registerUser,
  logout
}