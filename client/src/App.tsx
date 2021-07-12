import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchAuthStatusStartAsync } from './redux/user/user.actions'
import SignInSignUp from './pages/SignInAndSignUp.page'
import { InitialUserState, FetchStatus, CurrentUser } from './types'
interface AppProps {
  checkAuth: () => void,
  currentUser: CurrentUser
  fetchStatus: FetchStatus
}

const App: React.FC<AppProps> = ({ checkAuth, currentUser, fetchStatus }): JSX.Element => {
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(fetchStatus === 'loading') return <h1>Loading....</h1>

  return (
    <div>
      <h1>When I Work Demo</h1>
      {currentUser?._id ? <h2>Logged In</h2>  : <SignInSignUp />}
    </div>
  )
}

const mapStateToProps = ({ userReducer }: { userReducer: InitialUserState }) => {
  const { fetchStatus, currentUser } = userReducer
  return {
    currentUser,
    fetchStatus
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkAuth: () => dispatch<any>(fetchAuthStatusStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
