import EmployeeActionTypes from './employee.types'
import { AnyAction } from 'redux'
import { InitialEmployeeState } from '../../types'

const INITIAL_STATE: InitialEmployeeState = {
  employees: [],
  error: null,
  fetchStatus: 'idle',
}

const employeeReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case EmployeeActionTypes.FETCH_EMPLOYEE_CREATE_START:
      return {
        ...state,
        fetchStatus: 'loading',
      }
    case EmployeeActionTypes.FETCH_EMPLOYEE_CREATE_SUCCESS:
      return {
        ...state,
        fetchStatus: 'success',
        employees: [...state.employees, action.payload],
      }
    case EmployeeActionTypes.FETCH_EMPLOYEE_CREATE_FAILURE:
      return {
        ...state,
        fetchStatus: 'error',
        employees: [...state.employees, action.payload],
      }
    default:
      return {
        ...state,
      }
  }
}

export default employeeReducer
