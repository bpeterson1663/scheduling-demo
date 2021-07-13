import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { HeaderContainer, OptionsContainer, OptionLink, SignOutLink } from './header.styles'
import { RoleT } from '../../types'
import { fetchSignOutStartAsync } from '../../redux/user/user.actions'

interface HeaderT {
  signOutStart: () => void
  role: RoleT
}

const Header: React.FC<HeaderT> = ({ signOutStart, role }): JSX.Element => (
  <HeaderContainer>
    <OptionsContainer>
      <OptionLink to="/shifts">SHIFTS</OptionLink>
      {role === 'administrator' && <OptionLink to="/employees">EMPLOYEES</OptionLink>}
      <SignOutLink type="button" value="SIGN OUT" onClick={signOutStart} />
    </OptionsContainer>
  </HeaderContainer>
)

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOutStart: () => dispatch<any>(fetchSignOutStartAsync()),
})

export default connect(null, mapDispatchToProps)(Header)
