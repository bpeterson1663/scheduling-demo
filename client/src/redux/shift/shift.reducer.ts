import ShiftActionTypes from './shift.types'
import { AnyAction } from 'redux'
import { InitialShiftState } from '../../types'

const INITIAL_STATE: InitialShiftState = {
  shifts: [],
  shift: null,
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
    case ShiftActionTypes.FETCH_SHIFT_UPDATE_SUCCESS:
      return {
        ...state,
        fetchStatus: 'success',
        id: action.payload,
        message: 'Shift Updated Successfully',
      }
    case ShiftActionTypes.FETCH_SHIFT_SUCCESS:
      return {
        ...state,
        fetchStatus: 'success',
        shift: action.payload,
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
        shifts: state.shifts.filter((shift) => shift._id !== action.payload),
        message: null,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export default shiftReducer
