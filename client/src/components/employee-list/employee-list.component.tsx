import React from 'react'
import { UserT } from '../../types'
import { ROLES } from '../../constants'
interface EmployeeListT {
  employees: UserT[]
}

const EmployeeList: React.FC<EmployeeListT> = ({ employees }): JSX.Element => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Employee</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{ROLES.find((role) => role.value === employee.role)?.name}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeList
