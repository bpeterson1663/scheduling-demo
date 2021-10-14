import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { createStructuredSelector } from 'reselect'
import { useParams } from 'react-router-dom'
import { PageContainer, PageTitle } from './pages.styles'
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
} from '../types'
import { selectRole } from '../redux/user/user.selector'

interface ParamTypes {
  id: string
}

interface EditShiftProps {
  getShift: (id: string) => void
  shift: NewShiftT | null
}

const EditShift: React.FC<EditShiftProps> = ({ getShift, shift }) => {
  const { id } = useParams<ParamTypes>()

  useEffect(() => {
    getShift(id)
  }, [])

  return (
    <PageContainer>
      <PageTitle>Edit Shift</PageTitle>
    </PageContainer>
  )
}

interface State {
  employeeReducer: InitialEmployeeState
  shiftReducer: InitialShiftState
  userReducer: InitialUserState
}

interface DesiredSelection {
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
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getShift: (id: string) => dispatch<any>(fetchShiftStartAsync(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EditShift)
