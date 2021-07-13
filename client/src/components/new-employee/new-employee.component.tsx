import React, { useState, ChangeEvent, FormEvent } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchEmployeeCreateStartAsync } from '../../redux/employee/employee.actions'
import { ROLES } from '../../constants'
import { EmployeeT, MessageT, FetchStatusT, InitialEmployeeState, RoleT } from '../../types'
import { selectMessage, selectFetchStatus } from '../../redux/employee/employee.selector'

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
  if (fetchStatus === 'loading') return <h3>...Loading</h3>
  return (
    <div>
      {fetchStatus === 'error' && <h3>{message}</h3>}
      {fetchStatus === 'success' && <h3>{message}</h3>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <select
            name="role"
            value={role}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value as RoleT)}
          >
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Create Employee" />
      </form>
    </div>
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
