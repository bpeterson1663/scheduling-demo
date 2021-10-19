import React from 'react'
import { UserT } from '../../types'
import { ROLES } from '../../constants'
import { StyledTable, TableContainer } from '../table/table.styles'
import { ActionButtonContainer } from '../form/button.styles'

interface EmployeeListT {
  employees: UserT[]
  handleDelete: (id: string) => void
  handleEdit: (id: string) => void
}

const EmployeeList: React.FC<EmployeeListT> = ({ employees, handleDelete, handleEdit }): JSX.Element => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{ROLES.find((role) => role.value === employee.role)?.name}</td>
              <td>{employee.email}</td>
              <td>
                <ActionButtonContainer type="button" value="Delete" onClick={() => handleDelete(employee._id)} />
              </td>
              <td>
                <ActionButtonContainer type="button" value="Edit" onClick={() => handleEdit(employee._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  )
}

export default EmployeeList
