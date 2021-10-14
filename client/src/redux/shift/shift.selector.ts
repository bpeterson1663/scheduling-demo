import { createSelector } from 'reselect'
import { InitialShiftState } from '../../types'

const selectShiftReducer = (state: { shiftReducer: InitialShiftState }) => state.shiftReducer

export const selectShifts = createSelector([selectShiftReducer], (shift) => shift.shifts)

export const selectFetchStatus = createSelector([selectShiftReducer], (shift) => shift.fetchStatus)

export const selectMessage = createSelector([selectShiftReducer], (shift) => shift.message)

export const selectShift = createSelector([selectShiftReducer], (shift) => shift.shift)
