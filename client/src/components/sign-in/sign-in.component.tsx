import React, { useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchUserLogInStartAsync } from '../../redux/user/user.actions'
import { SignInT } from '../../types'

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Sign In" />
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (payload: SignInT) => dispatch<any>(fetchUserLogInStartAsync(payload)),
})

export default connect(null, mapDispatchToProps)(SignIn)
