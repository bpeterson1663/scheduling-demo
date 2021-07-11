import { Dispatch } from 'redux'
import UserActionTypes from './user.types'
import { signIn } from '../../api'
import { SignInT, UserT } from '../../types'
const fetchSignInStart = () => ({
  type: UserActionTypes.SIGN_IN_START,
})

const fetchSignInSuccess = (user: UserT) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
})

const fetchSignInError = (errorMessage: string) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: errorMessage,
})

export const fetchUserLogInStartAsync = (payload: SignInT) => async (dispatch: Dispatch) => {
  dispatch(fetchSignInStart())
  try {
    const user = await signIn(payload)
    dispatch(fetchSignInSuccess(user))
  } catch (err) {
    let errorMessage = 'Sign In Unsuccessful'
    dispatch(fetchSignInError(errorMessage))
  }
}
