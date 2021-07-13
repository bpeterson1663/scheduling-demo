import React, { useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchUserLogInStartAsync } from '../../redux/user/user.actions'
import { SignInT } from '../../types'
import { SignInTitle, SignInContainer, ButtonsBarContainer } from './sign-in.styles'
import { FormInputContainer, FormInputLabel, GroupContainer } from '../form/form-input.styles'
import { CustomButtonContainer } from '../form/button.styles'
interface SignInProps {
  signIn: (payload: SignInT) => void
}

const SignIn: React.FC<SignInProps> = ({ signIn }): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    signIn({ password, email })
  }
  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonsBarContainer>
          <CustomButtonContainer type="submit" value="Sign In" />
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (payload: SignInT) => dispatch<any>(fetchUserLogInStartAsync(payload)),
})

export default connect(null, mapDispatchToProps)(SignIn)
