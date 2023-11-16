import * as API             from '../../apis';
import { HandleError }      from '../../utils';
import * as userActionTypes from './actionTypes'

const fetchAll = () => {
  return (dispatch) => {
    return API.fetchAll()
      .then(res => {
        let users = res.data.data.users || [];
        dispatch({
          type: userActionTypes.FETCH_ALL_USERS,
          payload: users
        })

        return true;
      })
      .catch(err => {
        HandleError(err)
        return false;
      })
  }
}
export {
  fetchAll,
}
