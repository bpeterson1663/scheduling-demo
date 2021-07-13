import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import SignIn from '../components/sign-in/sign-in.component'
import SignUp from '../components/sign-up/sign-up.component'
import { MessageT, FetchStatusT, InitialUserState } from '../types'
import { selectMessage, selectFetchStatus } from '../redux/user/user.selector'

interface SignInSignUpT {
  message: MessageT
  fetchStatus: FetchStatusT
}

const SignInSignUp: React.FC<SignInSignUpT> = ({ message, fetchStatus }) => {
  return (
    <div>
      {fetchStatus === 'error' && <h3>{message}</h3>}
      <SignIn />
      <SignUp />
    </div>
  )
}

interface State {
  userReducer: InitialUserState
}

interface DesiredSelection {
  fetchStatus: FetchStatusT
  message: MessageT
}

const mapStateToProps = createStructuredSelector<State, DesiredSelection>({
  message: selectMessage,
  fetchStatus: selectFetchStatus,
})
export default connect(mapStateToProps)(SignInSignUp)
