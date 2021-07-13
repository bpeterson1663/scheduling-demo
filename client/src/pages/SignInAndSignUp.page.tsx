import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import SignIn from '../components/sign-in/sign-in.component'
import SignUp from '../components/sign-up/sign-up.component'
import { MessageT, FetchStatusT, InitialUserState } from '../types'
import { selectMessage, selectFetchStatus } from '../redux/user/user.selector'
import { PageContainer, ContentContainer } from './pages.styles'
import { ErrorMessage } from '../components/message/message.styles'

interface SignInSignUpT {
  message: MessageT
  fetchStatus: FetchStatusT
}

const SignInSignUp: React.FC<SignInSignUpT> = ({ message, fetchStatus }) => {
  return (
    <PageContainer>
      {fetchStatus === 'error' && message && <ErrorMessage>{message}</ErrorMessage>}
      <ContentContainer>
        <SignIn />
        <SignUp />
      </ContentContainer>
    </PageContainer>
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
