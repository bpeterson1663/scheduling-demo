import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'
import NewEmployee from '../components/new-employee/new-employee.component'
import EmployeeList from '../components/employee-list/employee-list.component'
import { UserT, InitialEmployeeState, FetchStatusT, MessageT, RoleT, InitialUserState } from '../types'
import { fetchAllEmployeesStartAsync, fetchEmployeeDeleteStart } from '../redux/employee/employee.actions'
import { selectEmployees, selectFetchStatus, selectMessage } from '../redux/employee/employee.selector'
import { selectRole } from '../redux/user/user.selector'

interface EmployeesT {
  getEmployees: (role: RoleT | undefined) => void
  deleteEmployee: (id: string) => void
  employees: UserT[]
  fetchStatus: FetchStatusT
  message: MessageT
  role: RoleT | undefined
}
const Employees: React.FC<EmployeesT> = ({ role, employees, getEmployees, deleteEmployee, fetchStatus, message }) => {
  useEffect(() => {
    getEmployees(role)
  }, [getEmployees])

  if (fetchStatus === 'loading') return <h3>...Loading</h3>

  const handleEmployeeDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?') === true) {
      deleteEmployee(id)
    }
  }
  return (
    <div>
      <h1>Employees</h1>
      {fetchStatus === 'error' && <h3>{message}</h3>}
      <NewEmployee />
      <EmployeeList employees={employees} handleDelete={handleEmployeeDelete} />
    </div>
  )
}

interface State {
  employeeReducer: InitialEmployeeState
  userReducer: InitialUserState
}

interface DesiredSelection {
  employees: UserT[]
  fetchStatus: FetchStatusT
  message: MessageT
  role: RoleT | undefined
}

const mapStateToProps = createStructuredSelector<State, DesiredSelection>({
  employees: selectEmployees,
  fetchStatus: selectFetchStatus,
  message: selectMessage,
  role: selectRole,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getEmployees: (role: RoleT | undefined) => dispatch<any>(fetchAllEmployeesStartAsync(role)),
  deleteEmployee: (id: string) => dispatch<any>(fetchEmployeeDeleteStart(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Employees)
