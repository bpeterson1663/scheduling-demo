import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectMessage, selectFetchStatus } from '../../redux/shift/shift.selector'
import { NewShiftT, UserT, InitialShiftState, FetchStatusT, MessageT } from '../../types'
import { fetchShiftCreateStartAsync } from '../../redux/shift/shift.actions'
import { createEpoch, createEndTime } from '../../helpers'
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
  return (
    <div>
      {fetchStatus === 'error' && <h3>{message}</h3>}
      {fetchStatus === 'success' && <h3>{message}</h3>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Shift Name</label>
          <input
            name="name"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userId">Select Employee</label>
          <select
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
          </select>
          <div>
            <label htmlFor="date">Date</label>
            <input
              name="date"
              type="date"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="startTime">Start Time</label>
            <input
              name="startTime"
              type="time"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time</label>
            <input
              name="endTime"
              type="time"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <input type="submit" value="Create Shift" />
      </form>
    </div>
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
