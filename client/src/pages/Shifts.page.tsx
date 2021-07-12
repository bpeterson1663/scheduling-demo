import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewShift from '../components/new-shift/new-shift.component'
import ShiftList from '../components/shift-list/shift-list.component'
import { Dispatch } from 'redux'
import { fetchAllEmployeesStartAsync } from '../redux/employee/employee.actions'
import { fetchAllShiftsStartSync } from '../redux/shift/shift.actions'
import { ShiftT, UserT, InitialEmployeeState, FetchStatusT, MessageT, InitialShiftState } from '../types'
import { formatShifts } from '../helpers'

interface ShiftsProps {
  getEmployees: () => void
  getShifts: () => void
  employees: UserT[]
  fetchStatus: FetchStatusT
  message: MessageT
  shifts: ShiftT[]
}

const Shifts: React.FC<ShiftsProps> = ({ getEmployees, getShifts, employees, fetchStatus, message, shifts }) => {
  useEffect(() => {
    getEmployees()
    getShifts()
  }, [getEmployees])
  if (fetchStatus === 'loading') return <h3>...Loading</h3>
  const formattedShifts = formatShifts(shifts, employees)
  return (
    <div>
      <h1>Shifts</h1>
      {fetchStatus === 'error' && <h3>{message}</h3>}
      <NewShift employees={employees} />
      <ShiftList shifts={formattedShifts} />
    </div>
  )
}

const mapStateToProps = ({
  employeeReducer,
  shiftReducer,
}: {
  employeeReducer: InitialEmployeeState
  shiftReducer: InitialShiftState
}) => {
  const { employees, fetchStatus, message } = employeeReducer
  const { shifts } = shiftReducer
  return {
    employees,
    fetchStatus,
    message,
    shifts,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getEmployees: () => dispatch<any>(fetchAllEmployeesStartAsync()),
  getShifts: () => dispatch<any>(fetchAllShiftsStartSync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
