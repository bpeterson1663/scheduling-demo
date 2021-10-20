import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { useHistory, useParams } from 'react-router-dom'
import { PageContainer, PageTitle, ContentContainer, BackButton } from './pages.styles'
import { UserT, InitialEmployeeState, InitialShiftState, InitialUserState, FetchStatusT, MessageT,  } from '../types'
import { createStructuredSelector } from 'reselect'
import { selectEmployee, selectFetchStatus, selectMessage } from '../redux/employee/employee.selector'
import { fetchEmployeeStartAsync } from '../redux/employee/employee.actions'

interface ParamTypes {
    id: string
}

interface EditEmployeeProps {
    getEmployee: (id: string) => void
    employee: UserT | null
}

export const EditEmployee: React.FC<EditEmployeeProps> = ({ getEmployee, employee }) => {
    const { id } = useParams<ParamTypes>()
    const history = useHistory()

  useEffect(() => {
    getEmployee(id)
  }, [])
  console.log("employee: ", employee)

  return (
    <PageContainer>
      <BackButton onClick={() => history.goBack()}>Back</BackButton>
      <PageTitle>Edit Employee</PageTitle>

      <ContentContainer></ContentContainer>
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
    employee: UserT | null
  }

const mapStateToProps = createStructuredSelector<State, DesiredSelection>({
  employee: selectEmployee,
  fetchStatus: selectFetchStatus,
  message: selectMessage,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getEmployee: (id: string) => dispatch<any>(fetchEmployeeStartAsync(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee)
