import UserActionTypes from './user.types'
import { AnyAction } from 'redux'
import { UserT } from '../../types'
interface InitialState {
    currentUser: UserT | null
    fetchStatus: 'idle' | 'loading' | 'success' | 'error',
    error: string | null
}
const INITIAL_STATE: InitialState = {
  currentUser: null,
  error: null,
  fetchStatus: 'idle' 
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
          error: null
      }
    case UserActionTypes.SIGN_IN_FAILURE: 
      return {
          ...state,
          fetchStatus: 'error',
          currentUser: null,
          error: action.payload
      }
    default:
      return {
        ...state,
      }
  }
}

export default userReducer
