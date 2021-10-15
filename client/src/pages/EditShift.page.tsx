import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'
import { useParams } from 'react-router-dom'
import { PageContainer, ContentContainer, PageTitle } from './pages.styles'
import { fetchShiftStartAsync } from '../redux/shift/shift.actions'
import { selectFetchStatus, selectMessage, selectShift } from '../redux/shift/shift.selector'
import {
  InitialEmployeeState,
  FetchStatusT,
  MessageT,
  InitialShiftState,
  InitialUserState,
  RoleT,
  NewShiftT,
  UserT
} from '../types'
import { selectRole } from '../redux/user/user.selector'
import Spinner from '../components/spinner/spinner.component'
import { ErrorMessage } from '../components/message/message.styles'
import { selectEmployees } from '../redux/employee/employee.selector'
import EditShiftForm from '../components/edit-shift/edit-shift.component'
interface ParamTypes {
  id: string
}

interface EditShiftProps {
  getShift: (id: string) => void
  shift: NewShiftT | null
  fetchStatus: FetchStatusT
  message: MessageT
  employees: UserT[]
}

const EditShift: React.FC<EditShiftProps> = ({ getShift, shift, employees, fetchStatus, message }) => {
  const { id } = useParams<ParamTypes>()

  useEffect(() => {
    getShift(id)
  }, [])

  return (
    <PageContainer>
      <PageTitle>Edit Shift</PageTitle>
      {fetchStatus === 'loading' && <Spinner />}
      {fetchStatus === 'error' && message && <ErrorMessage>{message}</ErrorMessage>}
      <ContentContainer>
        {shift && <EditShiftForm shift={shift} employees={employees}/>}
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
  shift: NewShiftT | null
}

const mapStateToProps = createStructuredSelector<State, DesiredSelection>({
  shift: selectShift,
  fetchStatus: selectFetchStatus,
  message: selectMessage,
  role: selectRole,
  employees: selectEmployees
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getShift: (id: string) => dispatch<any>(fetchShiftStartAsync(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EditShift)
