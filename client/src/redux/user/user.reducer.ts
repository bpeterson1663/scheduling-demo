import UserActionTypes from './user.types'
import { AnyAction } from 'redux'
import { InitialUserState } from '../../types'

const INITIAL_STATE: InitialUserState = {
  currentUser: null,
  error: null,
  fetchStatus: 'idle',
}

const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        fetchStatus: 'loading',
      }
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        fetchStatus: 'success',
        currentUser: action.payload,
        error: null,
      }
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        fetchStatus: 'error',
        currentUser: null,
        error: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export default userReducer
