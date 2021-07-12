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
    case EmployeeActionTypes.FETCH_EMPLOYEE_START:
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
    case EmployeeActionTypes.FETCH_EMPLOYEE_FAILURE:
      return {
        ...state,
        fetchStatus: 'error',
      }
    case EmployeeActionTypes.FETCH_ALL_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        fetchStatus: 'success',
        employees: action.payload,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export default employeeReducer
