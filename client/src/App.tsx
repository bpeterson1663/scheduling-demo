import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { fetchAuthStatusStartAsync } from './redux/user/user.actions'
import SignInSignUp from './pages/SignInAndSignUp.page'
import Header from './components/header/header.component'
import Shifts from './pages/Shifts.page'
import Employees from './pages/Employees.page'
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

  if (fetchStatus === 'loading') return <h1>Loading....</h1>

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={() => (currentUser?._id ? <Shifts /> : <SignInSignUp />)} />
        <Route exact path="/shifts" render={() => (currentUser?._id ? <Shifts /> : <SignInSignUp />)} />
        <Route exact path="/employees" render={() => (currentUser?._id ? <Employees /> : <SignInSignUp />)} />
        <Route exact path="/signin" render={() => (currentUser?._id ? <Redirect to="/" /> : <SignInSignUp />)} />
      </Switch>
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
