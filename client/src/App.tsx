import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import AuthenticatedApp from './AuthenticatedApp'
import UnAuthenticatedApp from './UnAuthenticatedApp'
import { fetchAuthStatusStartAsync } from './redux/user/user.actions'

import { InitialUserState, FetchStatusT, CurrentUser } from './types'
interface AppProps {
  checkAuth: () => void
  currentUser: CurrentUser
  fetchStatus: FetchStatusT
}

const App: React.FC<AppProps> = ({ checkAuth, currentUser, fetchStatus }): JSX.Element => {
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (fetchStatus === 'loading') return <h3>Loading....</h3>

  return (
    <div>
      {currentUser?._id && fetchStatus === 'success' ? (
        <AuthenticatedApp role={currentUser.role} />
      ) : (
        <UnAuthenticatedApp />
      )}
    </div>
  )
}

const mapStateToProps = ({ userReducer }: { userReducer: InitialUserState }) => {
  const { fetchStatus, currentUser } = userReducer
  return {
    currentUser,
    fetchStatus,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkAuth: () => dispatch<any>(fetchAuthStatusStartAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
