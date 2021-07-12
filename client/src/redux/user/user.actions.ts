import { Dispatch } from 'redux'
import UserActionTypes from './user.types'
import { signIn, checkAuth } from '../../api'
import { SignInT, UserT } from '../../types'

const fetchSignInAuthStart = () => ({
  type: UserActionTypes.SIGN_IN_START,
})

const fetchSignInAuthSuccess = (user: UserT) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
})

const fetchSignInAuthError = (errorMessage: string) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: errorMessage,
})

export const fetchUserLogInStartAsync = (payload: SignInT) => async (dispatch: Dispatch) => {
  dispatch(fetchSignInAuthStart())
  try {
    const response = await signIn(payload)
    const { user } = response.data
    dispatch(fetchSignInAuthSuccess(user))
  } catch (err) {
    let errorMessage = 'Sign In Unsuccessful'
    dispatch(fetchSignInAuthError(errorMessage))
  }
}

export const fetchAuthStatusStartAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchSignInAuthStart())
  try {
    const response = await checkAuth()
    const { user } = response.data
    dispatch(fetchSignInAuthSuccess(user))
  } catch (err) {
    let errorMessage = 'Sign In Unsuccessful'
    dispatch(fetchSignInAuthError(errorMessage))
  }
}
