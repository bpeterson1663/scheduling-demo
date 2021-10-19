import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/header/header.component'
import Shifts from './pages/Shifts.page'
import Employees from './pages/Employees.page'
import EditShift from './pages/EditShift.page'
import EditEmployee from './pages/EditEmployee.page'
import { RoleT } from './types'

interface AuthenticatedAppProps {
  role: RoleT
}

const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({ role }) => {
  return (
    <div>
      <Header role={role} />
      <Switch>
        <Route exact path="/" component={Shifts} />
        <Route exact path="/shifts" component={Shifts} />
        <Route exact path="/shift/:id" component={EditShift} />
        <Route exact path="/employee/:id" component={EditEmployee} />
        <Route
          exact
          path="/employees"
          render={() => (role === 'administrator' ? <Employees /> : <Redirect to="/" />)}
        />
      </Switch>
    </div>
  )
}

export default AuthenticatedApp
