import { createSelector } from 'reselect'
import { InitialUserState } from '../../types'

const selectUser = (state: { userReducer: InitialUserState }) => state.userReducer

export const selectCurrentUser = createSelector([selectUser], (user) => user.currentUser)

export const selectFetchStatus = createSelector([selectUser], (user) => user.fetchStatus)

export const selectMessage = createSelector([selectUser], (user) => user.message)

export const selectRole = createSelector([selectUser], (user) => user.currentUser?.role)
