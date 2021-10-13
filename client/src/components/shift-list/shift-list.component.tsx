import React from 'react'
import { DisplayShiftT } from '../../types'
import { ActionButtonContainer } from '../form/button.styles'
import { StyledTable, TableContainer } from '../table/table.styles'
interface ShiftListT {
  shifts: DisplayShiftT[]
  handleDelete: (id: string) => void
}

const ShiftList: React.FC<ShiftListT> = ({ shifts, handleDelete }): JSX.Element => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Shift Name</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration (hours)</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift._id}>
              <td>{shift.shiftName}</td>
              <td>{shift.fullName}</td>
              <td>{shift.startDate}</td>
              <td>{shift.startTime}</td>
              <td>{shift.endTime}</td>
              <td>{shift.duration}</td>
              <td>
                <ActionButtonContainer type="button" value="Delete" onClick={() => handleDelete(shift._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  )
}

export default ShiftList
