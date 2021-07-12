import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import NewEmployee from '../components/new-employee/new-employee.component'
import EmployeeList from '../components/employee-list/employee-list.component'
import { UserT, InitialEmployeeState, FetchStatusT, MessageT } from '../types'
import { fetchAllEmployeesStartAsync } from '../redux/employee/employee.actions'
interface EmployeesT {
  getEmployees: () => void
  employees: UserT[]
  fetchStatus: FetchStatusT
  message: MessageT
}
const Employees: React.FC<EmployeesT> = ({ employees, getEmployees, fetchStatus, message }) => {
  useEffect(() => {
    getEmployees()
  }, [getEmployees])

  if (fetchStatus === 'loading') return <h3>...Loading</h3>
  return (
    <div>
      <h1>Employees</h1>
      {fetchStatus === 'error' && <h3>{message}</h3>}
      <NewEmployee />
      <EmployeeList employees={employees} />
    </div>
  )
}

const mapStateToProps = ({ employeeReducer }: { employeeReducer: InitialEmployeeState }) => {
  const { employees, fetchStatus, message } = employeeReducer
  return {
    employees,
    fetchStatus,
    message,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getEmployees: () => dispatch<any>(fetchAllEmployeesStartAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Employees)
