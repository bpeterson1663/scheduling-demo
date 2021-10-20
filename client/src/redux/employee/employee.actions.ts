import { Dispatch } from 'redux'
import EmployeeActionTypes from './employee.types'
import { EmployeeT, UserT, MessageT, RoleT } from '../../types'
import { createEmployee, getAllEmployees, deleteEmployee, getEmployeeById } from '../../api'
const fetchEmployeeStart = () => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_START,
})

const fetchCreateSuccess = (employee: UserT) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_CREATE_SUCCESS,
  payload: employee,
})
const fetchEmployeeSuccess = (user: UserT) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_SUCCESS,
  payload: user,
})
const fetchEmployeeFailure = (errorMessage: MessageT) => ({
  type: EmployeeActionTypes.FETCH_EMPLOYEE_FAILURE,
  payload: errorMessage,
})

export const fetchEmployeeStartAsync = (id: string) => async (dispatch: Dispatch) => {
  dispatch(fetchEmployeeStart())
  try {
    const response = await getEmployeeById(id)
    const { user } = response.data
    dispatch(fetchEmployeeSuccess(user))
  } catch (err) {
    const {
      response: { data },
    } = err
    const { error } = data
    dispatch(fetchEmployeeFailure(error))
  }
}

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

const fetchDeleteSuccess = (id: string) => ({
  type: EmployeeActionTypes.FETCH_DELETE_EMPLOYEE_SUCCESS,
  payload: id,
})

export const fetchAllEmployeesStartAsync = (role: RoleT | undefined) => async (dispatch: Dispatch) => {
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

export const fetchEmployeeDeleteStart = (id: string) => async (dispatch: Dispatch) => {
  dispatch(fetchEmployeeStart())
  try {
    await deleteEmployee(id)
    dispatch(fetchDeleteSuccess(id))
  } catch (err) {
    const {
      response: { data },
    } = err
    const { error } = data
    dispatch(fetchEmployeeFailure(error))
  }
}
