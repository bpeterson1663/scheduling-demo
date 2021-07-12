import { Dispatch } from 'redux'
import EmployeeActionTypes from './employee.types'
import { EmployeeT, UserT, ErrorT } from '../../types'
import { createEmployee } from '../../api'
const fetchCreateStart = () => ({
    type: EmployeeActionTypes.FETCH_EMPLOYEE_CREATE_START
})

const fetchCreateSuccess = (employee: UserT) => ({
    type: EmployeeActionTypes.FETCH_EMPLOYEE_CREATE_SUCCESS,
    payload: employee
})

const fetchCreateFailure = (errorMessage: ErrorT) => ({
    type: EmployeeActionTypes.FETCH_EMPLOYEE_CREATE_FAILURE,
    payload: errorMessage
})

export const fetchEmployeeCreateStartAsync = (payload: EmployeeT)=> async (dispatch: Dispatch) => {
  dispatch(fetchCreateStart())
  try {
      const response = await createEmployee(payload)
      const { employee } = response.data
      dispatch(fetchCreateSuccess(employee))
  } catch (err) {
    const {
        response: { data },
      } = err
      const { error } = data
      dispatch(fetchCreateFailure(error))
  }
}