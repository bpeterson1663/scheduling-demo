import ShiftActionTypes from './shift.types'
import { AnyAction } from 'redux'
import { InitialShiftState } from '../../types'

const INITIAL_STATE: InitialShiftState = {
  shifts: [],
  message: null,
  fetchStatus: 'idle',
}

const shiftReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case ShiftActionTypes.FETCH_SHIFT_START:
      return {
        ...state,
        fetchStatus: 'loading',
      }
    case ShiftActionTypes.FETCH_SHIFT_CREATE_SUCCESS:
      return {
        ...state,
        fetchStatus: 'success',
        shifts: [...state.shifts, action.payload],
        message: 'Shift Created Successfully',
      }
    case ShiftActionTypes.FETCH_SHIFT_FAILURE:
      return {
        ...state,
        fetchStatus: 'error',
        message: action.payload,
      }
    case ShiftActionTypes.FETCH_ALL_SHIFT_SUCCESS: {
      return {
        ...state,
        fetchStatus: 'idle',
        shifts: action.payload,
        message: null,
      }
    }
    case ShiftActionTypes.FETCH_DELETE_SHIFT_SUCCESS: {
      return {
        ...state,
        fetchStatus: 'success',
        shifts: state.shifts.filter(shift => shift._id !== action.payload)
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export default shiftReducer
