import React, { useState, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchSignUpStartAsync } from '../../redux/user/user.actions'
import { SignUpT } from '../../types'

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="businessName">Business Name</label>
          <input
            name="businessName"
            type="text"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
          />
        </div>
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
        <div>
          <label htmlFor="password">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUp: (payload: SignUpT) => dispatch<any>(fetchSignUpStartAsync(payload)),
})

export default connect(null, mapDispatchToProps)(SignUp)
