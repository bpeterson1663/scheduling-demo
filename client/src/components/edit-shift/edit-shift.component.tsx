import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { UserT, NewShiftT } from '../../types' 
import { FormInputContainer, FormInputLabel, GroupContainer, FormSelectContainer } from '../form/form-input.styles'
import { CustomButtonContainer } from '../form/button.styles'
import { getHourMinute, getDateString } from '../../helpers'
interface EditShiftProps {
    employees: UserT[]
    shift: NewShiftT
}

const EditShiftForm: React.FC<EditShiftProps> = ({ employees, shift }) => {
    const [name, setName] = useState('')
    const [userId, setUserId] = useState('')
    const [date, setDate] = useState('')
    const [endTime, setEndTime] = useState('')
    const [startTime, setStartTime] = useState('')
    
    useEffect(() => {
        setName(shift.name)
        setUserId(shift.userId)
        setDate(getDateString(shift.startTime))
        setEndTime(getHourMinute(shift.endTime))
        setStartTime(getHourMinute(shift.startTime))
    }, [])
    const handleSubmit = (event: FormEvent) => {

    }
    
    return (
        <form onSubmit={handleSubmit}>
        <GroupContainer>
          <FormInputLabel htmlFor="name">Shift Name</FormInputLabel>
          <FormInputContainer
            name="name"
            type="text"
            required
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="userId">Select Employee</FormInputLabel>
          <FormSelectContainer
            name="userId"
            value={userId}
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
            value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="startTime">Start Time</FormInputLabel>
          <FormInputContainer
            name="startTime"
            type="time"
            value={startTime}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e.target.value)}
          />
        </GroupContainer>
        <GroupContainer>
          <FormInputLabel htmlFor="endTime">End Time</FormInputLabel>
          <FormInputContainer
            name="endTime"
            type="time"
            value={endTime}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
          />
        </GroupContainer>
        <CustomButtonContainer type="submit" value="Create Shift" />
      </form>
    )
}

export default EditShiftForm