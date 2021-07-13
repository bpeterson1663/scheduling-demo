import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import NewShift from '../components/new-shift/new-shift.component'
import ShiftList from '../components/shift-list/shift-list.component'
import { Dispatch } from 'redux'
import { fetchAllEmployeesStartAsync } from '../redux/employee/employee.actions'
import { fetchAllShiftsStartSync, fetchShiftDeleteStart } from '../redux/shift/shift.actions'
import { selectEmployees, selectFetchStatus, selectMessage } from '../redux/employee/employee.selector'
import { selectRole } from '../redux/user/user.selector'
import { selectShifts } from '../redux/shift/shift.selector'
import { ErrorMessage } from '../components/message/message.styles'
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
import { PageContainer, ContentContainer, PageTitle } from './pages.styles'
import Spinner from '../components/spinner/spinner.component'

interface ShiftsProps {
  getEmployees: (role: RoleT | undefined) => void
  getShifts: () => void
  deleteShift: (id: string) => void
  employees: UserT[]
  fetchStatus: FetchStatusT
  message: MessageT
  shifts: ShiftT[]
  role: RoleT | undefined
}

const Shifts: React.FC<ShiftsProps> = ({
  deleteShift,
  role,
  getEmployees,
  getShifts,
  employees,
  fetchStatus,
  message,
  shifts,
}) => {
  useEffect(() => {
    getEmployees(role)
    getShifts()
  }, [getEmployees])
  if (fetchStatus === 'loading') return <Spinner />
  const formattedShifts = formatShifts(shifts, employees)

  const handleShiftDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this shift?') === true) {
      deleteShift(id)
    }
  }
  return (
    <PageContainer>
      <PageTitle>Shifts</PageTitle>
      {fetchStatus === 'error' && message && <ErrorMessage>{message}</ErrorMessage>}
      <ContentContainer>
        {role === 'administrator' && <NewShift employees={employees} />}
        <ShiftList shifts={formattedShifts} handleDelete={handleShiftDelete} />
      </ContentContainer>
    </PageContainer>
  )
}

interface State {
  employeeReducer: InitialEmployeeState
  shiftReducer: InitialShiftState
  userReducer: InitialUserState
}

interface DesiredSelection {
  employees: UserT[]
  fetchStatus: FetchStatusT
  message: MessageT
  role: RoleT | undefined
  shifts: ShiftT[]
}

const mapStateToProps = createStructuredSelector<State, DesiredSelection>({
  employees: selectEmployees,
  fetchStatus: selectFetchStatus,
  message: selectMessage,
  role: selectRole,
  shifts: selectShifts,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getEmployees: (role: RoleT | undefined) => dispatch<any>(fetchAllEmployeesStartAsync(role)),
  getShifts: () => dispatch<any>(fetchAllShiftsStartSync()),
  deleteShift: (id: string) => dispatch<any>(fetchShiftDeleteStart(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
