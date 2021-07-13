import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewShift from '../components/new-shift/new-shift.component'
import ShiftList from '../components/shift-list/shift-list.component'
import { Dispatch } from 'redux'
import { fetchAllEmployeesStartAsync } from '../redux/employee/employee.actions'
import { fetchAllShiftsStartSync } from '../redux/shift/shift.actions'
import {
  ShiftT,
  UserT,
  InitialEmployeeState,
  FetchStatusT,
  MessageT,
  InitialShiftState,
  InitialUserState,
  RoleT,
} from '../types'
import { formatShifts } from '../helpers'

interface ShiftsProps {
  getEmployees: (role: RoleT | null) => void
  getShifts: () => void
  employees: UserT[]
  fetchStatus: FetchStatusT
  message: MessageT
  shifts: ShiftT[]
  role: RoleT | null
}

const Shifts: React.FC<ShiftsProps> = ({ role, getEmployees, getShifts, employees, fetchStatus, message, shifts }) => {
  useEffect(() => {
    getEmployees(role)
    getShifts()
  }, [getEmployees])
  if (fetchStatus === 'loading') return <h3>...Loading</h3>
  const formattedShifts = formatShifts(shifts, employees)
  return (
    <div>
      <h1>Shifts</h1>
      {fetchStatus === 'error' && <h3>{message}</h3>}
      {role === 'administrator' && <NewShift employees={employees} />}
      <ShiftList shifts={formattedShifts} />
    </div>
  )
}

const mapStateToProps = ({
  employeeReducer,
  shiftReducer,
  userReducer,
}: {
  employeeReducer: InitialEmployeeState
  shiftReducer: InitialShiftState
  userReducer: InitialUserState
}) => {
  const { employees, fetchStatus, message } = employeeReducer
  const { shifts } = shiftReducer
  const { currentUser } = userReducer
  const role = currentUser?.role || null
  return {
    employees,
    fetchStatus,
    message,
    shifts,
    role,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getEmployees: (role: RoleT | null) => dispatch<any>(fetchAllEmployeesStartAsync(role)),
  getShifts: () => dispatch<any>(fetchAllShiftsStartSync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
