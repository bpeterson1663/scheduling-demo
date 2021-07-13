import { Dispatch } from 'redux'
import ShiftActionTypes from './shift.types'
import { NewShiftT, ShiftT, MessageT } from '../../types'
import { createShift, getAllShifts, deleteShift } from '../../api'

const fetchShiftStart = () => ({
  type: ShiftActionTypes.FETCH_SHIFT_START,
})

const fetchCreateSuccess = (shift: ShiftT) => ({
  type: ShiftActionTypes.FETCH_SHIFT_CREATE_SUCCESS,
  payload: shift,
})

const fetchShiftFailure = (errorMessage: MessageT) => ({
  type: ShiftActionTypes.FETCH_SHIFT_FAILURE,
  payload: errorMessage,
})

const fetchAllShiftsSuccess = (shifts: ShiftT[]) => ({
  type: ShiftActionTypes.FETCH_ALL_SHIFT_SUCCESS,
  payload: shifts,
})

const fetchDeleteSuccess = (id: string) => ({
  type: ShiftActionTypes.FETCH_DELETE_SHIFT_SUCCESS,
  payload: id,
})

export const fetchShiftCreateStartAsync = (payload: NewShiftT) => async (dispatch: Dispatch) => {
  dispatch(fetchShiftStart())
  try {
    const response = await createShift(payload)
    const { shift } = response.data
    dispatch(fetchCreateSuccess(shift))
  } catch (err) {
    const {
      response: { data },
    } = err
    const { error } = data
    dispatch(fetchShiftFailure(error))
  }
}

export const fetchAllShiftsStartSync = () => async (dispatch: Dispatch) => {
  dispatch(fetchShiftStart())
  try {
    const response = await getAllShifts()
    const { shifts } = response.data
    dispatch(fetchAllShiftsSuccess(shifts))
  } catch (err) {
    const {
      response: { data },
    } = err
    const { error } = data
    dispatch(fetchShiftFailure(error))
  }
}

export const fetchShiftDeleteStart = (id: string) => async (dispatch: Dispatch) => {
  dispatch(fetchShiftStart())
  try {
    await deleteShift(id)
    dispatch(fetchDeleteSuccess(id))
  } catch (err) {
    const {
      response: { data },
    } = err
    const { error } = data
    dispatch(fetchShiftFailure(error))
  }
}