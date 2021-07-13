import React from 'react'
import { UserT } from '../../types'
import { ROLES } from '../../constants'
import { StyledTable } from '../table/table.styles'
import { DeleteButtonContainer } from '../form/button.styles'

interface EmployeeListT {
  employees: UserT[]
  handleDelete: (id: string) => void
}

const EmployeeList: React.FC<EmployeeListT> = ({ employees, handleDelete }): JSX.Element => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>Delete</th>
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
              <DeleteButtonContainer type="button" value="Delete" onClick={() => handleDelete(employee._id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

export default EmployeeList
