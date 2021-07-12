import React from 'react'
import { connect } from 'react-redux'
import SignIn from '../components/sign-in/sign-in.component'
import SignUp from '../components/sign-up/sign-up.component'
import { ErrorT, FetchStatusT, InitialUserState } from '../types'

interface SignInSignUpT {
  error: ErrorT,
  fetchStatus: FetchStatusT
}

const SignInSignUp: React.FC<SignInSignUpT> = ({error, fetchStatus}) => {
  return (
    <div>
      {fetchStatus === 'error' && <h3>{error}</h3>}
      <SignIn />
      <SignUp />
    </div>
  )
}
const mapStateToProps = ({ userReducer }: { userReducer: InitialUserState }) => {
  const { error, fetchStatus } = userReducer
  return {
    error,
    fetchStatus
  }
}
export default connect(mapStateToProps)(SignInSignUp)
