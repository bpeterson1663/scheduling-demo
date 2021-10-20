import { createSelector } from 'reselect'
import { InitialEmployeeState } from '../../types'

const selectEmployeeReducer = (state: { employeeReducer: InitialEmployeeState }) => state.employeeReducer

export const selectEmployees = createSelector([selectEmployeeReducer], (employee) => employee.employees)

export const selectFetchStatus = createSelector([selectEmployeeReducer], (employee) => employee.fetchStatus)

export const selectMessage = createSelector([selectEmployeeReducer], (employee) => employee.message)

export const selectEmployee = createSelector([selectEmployeeReducer], (employee) => employee.employee)
