import React, { useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchSignUpStartAsync } from '../../redux/user/user.actions'
import { SignUpT } from '../../types'
import { SignUpContainer, SignUpTitle } from './sign-up.styles'
import { FormInputContainer, FormInputLabel, GroupContainer } from '../form/form-input.styles'
import { CustomButtonContainer } from '../form/button.styles'

interface SignUpProps {
  signUp: (payload: SignUpT) => void
}

const SignUp: React.FC<SignUpProps> = ({ signUp }): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [businessName, setBusinessName] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }
    signUp({ password, email, firstName, lastName, businessName, role: 'administrator' })
  }
  return (
    <SignUpContainer>
      <SignUpTitle>I do not have an account</SignUpTitle>
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
          <FormInputLabel htmlFor="businessName">Business Name</FormInputLabel>
          <FormInputContainer
            name="businessName"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
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
        <CustomButtonContainer type="submit" value="Sign Up" />
      </form>
    </SignUpContainer>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUp: (payload: SignUpT) => dispatch<any>(fetchSignUpStartAsync(payload)),
})

export default connect(null, mapDispatchToProps)(SignUp)
