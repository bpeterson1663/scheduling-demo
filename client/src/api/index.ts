import axios, { AxiosResponse } from 'axios'
import { SignInT, UserT } from '../types'

const api = axios.create({
  withCredentials: true,
  baseURL: `http://localhost:4000/api`,
})

export const signIn = (payload: SignInT): Promise<AxiosResponse> => api.post('/login', payload)
export const checkAuth = (): Promise<AxiosResponse> => api.get('/authorized')
