import React, { ChangeEvent, useState, useEffect } from 'react'
import { UserT, RoleT } from '../../types'
import { FormInputContainer, FormInputLabel, GroupContainer, FormSelectContainer } from '../form/form-input.styles'
import { ROLES } from '../../constants'
import { CustomButtonContainer } from '../form/button.styles'

interface EditEmployeeProps {
  employee: UserT
  onSubmit: (id: string, employee: UserT) => void
}

const EditEmployeeForm: React.FC<EditEmployeeProps> = ({ employee }) => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<RoleT>('employee')

  useEffect(() => {
    setEmail(employee.email)
    setFirstName(employee.firstName)
    setLastName(employee.lastName)
    setRole(employee.role)
  }, [])

  return (
    <form>
      <GroupContainer>
        <FormInputLabel htmlFor="firstName">First Name</FormInputLabel>
        <FormInputContainer
          name="firstName"
          type="text"
          value={firstName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
        />
      </GroupContainer>
      <GroupContainer>
        <FormInputLabel htmlFor="lastName">Last Name</FormInputLabel>
        <FormInputContainer
          name="lastName"
          type="text"
          value={lastName}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
        />
      </GroupContainer>
      <GroupContainer>
        <FormInputLabel htmlFor="email">Email</FormInputLabel>
        <FormInputContainer
          name="email"
          type="email"
          value={email}
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
      <CustomButtonContainer type="submit" value="Edit Employee" />
    </form>
  )
}

export default EditEmployeeForm
