import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectMessage, selectFetchStatus } from '../../redux/shift/shift.selector'
import { NewShiftT, UserT, InitialShiftState, FetchStatusT, MessageT } from '../../types'
import { fetchShiftCreateStartAsync } from '../../redux/shift/shift.actions'
import { createEpoch, createEndTime } from '../../helpers'
import { FormInputContainer, FormInputLabel, GroupContainer, FormSelectContainer } from '../form/form-input.styles'
import { CustomButtonContainer } from '../form/button.styles'
import { NewShiftContainer } from './new-shift.styles'
import Spinner from '../../components/spinner/spinner.component'
import { ErrorMessage, SuccessMessage } from '../../components/message/message.styles'

interface NewShiftProps {
  employees: UserT[]
  createShift: (payload: NewShiftT) => void
  fetchStatus: FetchStatusT
  message: MessageT
}

const NewShift: React.FC<NewShiftProps> = ({ employees, createShift, fetchStatus, message }): JSX.Element => {
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [date, setDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [startTime, setStartTime] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const epochStartTime = createEpoch(date, startTime)
    const epochEndTime = createEndTime(epochStartTime, startTime, endTime)

    createShift({
      name,
      userId,
      startTime: epochStartTime,
      endTime: epochEndTime,
    })
  }
  if (fetchStatus === 'loading') return <Spinner />

  return (
    <NewShiftContainer>
      {fetchStatus === 'error' && message && <ErrorMessage>{message}</ErrorMessage>}
      {fetchStatus === 'success' && message &&  <SuccessMessage>{message}</SuccessMessage>}
      <form onSubmit={handleSubmit}>
        <GroupContainer>
          <FormInputLabel htmlFor="name">Shift Name</FormInputLabel>
          <FormInputContainer
            name="name"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="userId">Select Employee</FormInputLabel>
          <FormSelectContainer
            name="userId"
            defaultValue={userId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value)}
          >
            <option disabled value="" hidden>
              {' '}
              -- select an option --{' '}
            </option>
            {employees.map((employee: UserT) => (
              <option key={employee._id} value={employee._id}>
                {employee.lastName}, {employee.firstName}
              </option>
            ))}
          </FormSelectContainer>
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="date">Date</FormInputLabel>
          <FormInputContainer
            name="date"
            type="date"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="startTime">Start Time</FormInputLabel>
          <FormInputContainer
            name="startTime"
            type="time"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="endTime">End Time</FormInputLabel>
          <FormInputContainer
            name="endTime"
            type="time"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
          />
        </GroupContainer>
        <CustomButtonContainer type="submit" value="Create Shift" />
      </form>
    </NewShiftContainer>
  )
}

interface State {
  shiftReducer: InitialShiftState
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
  createShift: (payload: NewShiftT) => dispatch<any>(fetchShiftCreateStartAsync(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewShift)
