import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { HeaderContainer, OptionsContainer, OptionLink } from './header.styles'
import { InitialUserState, UserT } from '../../types'
import { fetchSignOutStartAsync } from '../../redux/user/user.actions'

interface HeaderT {
  currentUser: UserT | null
  signOutStart: () => void
}

const Header: React.FC<HeaderT> = ({ currentUser, signOutStart }): JSX.Element => {
  return (
    <HeaderContainer>
      <OptionsContainer>
        {currentUser?._id ? (
          <>
            <OptionLink to="/employees">EMPLOYEES</OptionLink>
            <OptionLink to="/shifts">MANAGE SHIFTS</OptionLink>
            <button onClick={signOutStart}>SIGN OUT</button>
          </>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
      </OptionsContainer>
    </HeaderContainer>
  )
}

const mapStateToProps = ({ userReducer }: { userReducer: InitialUserState }) => {
  const { currentUser } = userReducer
  return {
    currentUser,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOutStart: () => dispatch<any>(fetchSignOutStartAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
