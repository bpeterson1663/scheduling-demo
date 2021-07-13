import React, { useState, ChangeEvent, FormEvent } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchEmployeeCreateStartAsync } from '../../redux/employee/employee.actions'
import { ROLES } from '../../constants'
import { EmployeeT, MessageT, FetchStatusT, InitialEmployeeState, RoleT } from '../../types'
import { selectMessage, selectFetchStatus } from '../../redux/employee/employee.selector'
import { NewEmployeeContainer } from './new-employee.styles'
import { FormInputContainer, FormInputLabel, GroupContainer, FormSelectContainer } from '../form/form-input.styles'
import { CustomButtonContainer } from '../form/button.styles'
import { ErrorMessage, SuccessMessage } from '../../components/message/message.styles'
import Spinner from '../../components/spinner/spinner.component'

interface NewEmployeeT {
  createEmployee: (payload: EmployeeT) => void
  fetchStatus: FetchStatusT
  message: MessageT
}
const NewEmployee: React.FC<NewEmployeeT> = ({ createEmployee, fetchStatus, message }): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<RoleT>('employee')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }
    createEmployee({
      email,
      password,
      firstName,
      lastName,
      role,
    })
  }
  if (fetchStatus === 'loading') return <Spinner />
  return (
    <NewEmployeeContainer>
      {fetchStatus === 'error' && <ErrorMessage>{message}</ErrorMessage>}
      {fetchStatus === 'success' && <SuccessMessage>{message}</SuccessMessage>}
      <form onSubmit={handleSubmit}>
        <GroupContainer>
          <FormInputLabel htmlFor="firstName">First Name</FormInputLabel>
          <FormInputContainer
            name="firstName"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="lastName">Last Name</FormInputLabel>
          <FormInputContainer
            name="lastName"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="email">Email</FormInputLabel>
          <FormInputContainer
            name="email"
            type="email"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="role">Role</FormInputLabel>
          <FormSelectContainer
            name="role"
            value={role}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value as RoleT)}
          >
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.name}
              </option>
            ))}
          </FormSelectContainer>
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="password">Password</FormInputLabel>
          <FormInputContainer
            name="password"
            type="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="password">Confirm Password</FormInputLabel>
          <FormInputContainer
            name="confirmPassword"
            type="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          />
        </GroupContainer>
        <CustomButtonContainer type="submit" value="Create Employee" />
      </form>
    </NewEmployeeContainer>
  )
}

interface State {
  employeeReducer: InitialEmployeeState
}

interface DesiredSelection {
  fetchStatus: FetchStatusT
  message: MessageT
}

const mapStateToProps = createStructuredSelector<State, DesiredSelection>({
  message: selectMessage,
  fetchStatus: selectFetchStatus,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createEmployee: (payload: EmployeeT) => dispatch<any>(fetchEmployeeCreateStartAsync(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewEmployee)
