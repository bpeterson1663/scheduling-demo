import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Dispatch } from 'redux'
import AuthenticatedApp from './AuthenticatedApp'
import UnAuthenticatedApp from './UnAuthenticatedApp'
import { selectCurrentUser, selectFetchStatus } from './redux/user/user.selector'
import { fetchAuthStatusStartAsync } from './redux/user/user.actions'
import { GlobalStyle } from './global.styles'

import { InitialUserState, UserT, FetchStatusT, CurrentUser } from './types'
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
      <GlobalStyle />
      {currentUser?._id && fetchStatus === 'success' ? (
        <AuthenticatedApp role={currentUser.role} />
      ) : (
        <UnAuthenticatedApp />
      )}
    </div>
  )
}

interface State {
  userReducer: InitialUserState
}

interface DesiredSelection {
  currentUser: UserT | null
  fetchStatus: FetchStatusT
}

const mapStateToProps = createStructuredSelector<State, DesiredSelection>({
  currentUser: selectCurrentUser,
  fetchStatus: selectFetchStatus,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkAuth: () => dispatch<any>(fetchAuthStatusStartAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
