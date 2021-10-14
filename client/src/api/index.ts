import axios, { AxiosResponse } from 'axios'
import { SignInT, SignUpT, EmployeeT, NewShiftT } from '../types'

const baseURL = 'http://localhost:4000/api'

const api = axios.create({
  withCredentials: true,
  baseURL,
})

export const signIn = (payload: SignInT): Promise<AxiosResponse> => api.post('/login', payload)
export const signUp = (payload: SignUpT): Promise<AxiosResponse> => api.post('/register', payload)
export const signOut = (): Promise<AxiosResponse> => api.delete('/logout')
export const checkAuth = (): Promise<AxiosResponse> => api.get('/authorized')

export const createEmployee = (payload: EmployeeT): Promise<AxiosResponse> => api.post('/user', payload)
export const getAllEmployees = (): Promise<AxiosResponse> => api.get('/users')
export const deleteEmployee = (id: string): Promise<AxiosResponse> => api.delete(`/user/${id}`)

export const createShift = (payload: NewShiftT): Promise<AxiosResponse> => api.post('/shift', payload)
export const getAllShifts = (): Promise<AxiosResponse> => api.get('/shifts')
export const deleteShift = (id: string): Promise<AxiosResponse> => api.delete(`/shift/${id}`)
export const getShiftById = (id: string): Promise<AxiosResponse> => api.get(`/shift/${id}`)
