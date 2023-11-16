import * as usersActions from './actionTypes'

const usersInitialState = []
const reducers = (state = usersInitialState, action) => {
  switch (action.type) {
    case usersActions.FETCH_ALL_USERS:
      return [
        ...action.payload
      ]
    default:
      return state;
  }
}

export default reducers;