import React from 'react'
import { connect } from 'react-redux'
import SignIn from '../components/sign-in/sign-in.component'
import SignUp from '../components/sign-up/sign-up.component'
import { MessageT, FetchStatusT, InitialUserState } from '../types'

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
const mapStateToProps = ({ userReducer }: { userReducer: InitialUserState }) => {
  const { message, fetchStatus } = userReducer
  return {
    message,
    fetchStatus,
  }
}
export default connect(mapStateToProps)(SignInSignUp)
