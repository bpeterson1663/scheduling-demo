import EmployeeActionTypes from './employee.types'
import { AnyAction } from 'redux'
import { InitialEmployeeState } from '../../types'

const INITIAL_STATE: InitialEmployeeState = {
  employees: [],
  message: null,
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
        message: 'Emlpoyee Created Succesfully'
      }
    case EmployeeActionTypes.FETCH_EMPLOYEE_FAILURE:
      return {
        ...state,
        fetchStatus: 'error',
        message: action.payload,
      }
    case EmployeeActionTypes.FETCH_ALL_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        fetchStatus: 'idle',
        employees: action.payload,
        message: null,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export default employeeReducer
