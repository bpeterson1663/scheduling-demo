import { Dispatch } from 'redux'
import EmployeeActionTypes from './employee.types'
import { EmployeeT, UserT, MessageT, RoleT } from '../../types'
import { createEmployee, getAllEmployees } from '../../api'
const fetchEmployeeStart = () => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_START,
})

const fetchCreateSuccess = (employee: UserT) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_CREATE_SUCCESS,
  payload: employee,
})

const fetchEmployeeFailure = (errorMessage: MessageT) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_FAILURE,
  payload: errorMessage,
})

export const fetchEmployeeCreateStartAsync = (payload: EmployeeT) => async (dispatch: Dispatch) => {
  dispatch(fetchEmployeeStart())
  try {
    const response = await createEmployee(payload)
    const { user } = response.data
    dispatch(fetchCreateSuccess(user))
  } catch (err) {
    const {
      response: { data },
    } = err
    const { error } = data
    dispatch(fetchEmployeeFailure(error))
  }
}

const fetchAllEmployeesSuccess = (users: UserT[]) => ({
  type: EmployeeActionTypes.FETCH_ALL_EMPLOYEES_SUCCESS,
  payload: users,
})

export const fetchAllEmployeesStartAsync = (role: RoleT | null) => async (dispatch: Dispatch) => {
  if (role !== 'administrator') return
  dispatch(fetchEmployeeStart())
  try {
    const response = await getAllEmployees()
    const { users } = response.data
    dispatch(fetchAllEmployeesSuccess(users))
  } catch (err) {
    const {
      response: { data },
    } = err
    const { error } = data
    dispatch(fetchEmployeeFailure(error))
  }
}
