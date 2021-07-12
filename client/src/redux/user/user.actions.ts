import { Dispatch } from 'redux'
import UserActionTypes from './user.types'
import { signIn, checkAuth, signUp } from '../../api'
import { ErrorT, SignInT, SignUpT, UserT } from '../../types'

const fetchAuthStart = () => ({
  type: UserActionTypes.SIGN_IN_START,
})

const fetchAuthSuccess = (user: UserT) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
})

const fetchAuthError = (errorMessage: ErrorT) => ({
  type: UserActionTypes.AUTH_FAILURE,
  payload: errorMessage
})

export const fetchUserLogInStartAsync = (payload: SignInT) => async (dispatch: Dispatch) => {
  dispatch(fetchAuthStart())
  try {
    const response = await signIn(payload)
    const { user } = response.data
    dispatch(fetchAuthSuccess(user))
  } catch (err) {
    const { response: { data } } = err
    const { error } = data
    dispatch(fetchAuthError(error))
  }
}

export const fetchAuthStatusStartAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchAuthStart())
  try {
    const response = await checkAuth()
    const { user } = response.data
    dispatch(fetchAuthSuccess(user))
  } catch (err) {
    const { response: { data } } = err
    const { error } = data
    dispatch(fetchAuthError(error))
  }
}

export const fetchSignUpStartAsync = (payload: SignUpT) => async (dispatch: Dispatch) => {
  dispatch(fetchAuthStart())
  try {
    const response = await signUp(payload)
    const { user } = response.data
    dispatch(fetchAuthSuccess(user))
  } catch (err) {
    const { response: { data } } = err
    const { error } = data
    dispatch(fetchAuthError(error))
  }
}
