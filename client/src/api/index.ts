import axios, { AxiosResponse } from 'axios'
import { SignInT } from '../types'

const baseURL = 'https://when-i-work-challenge.herokuapp.com/api'

const api = axios.create({
  withCredentials: true,
  baseURL
})

export const signIn = (payload: SignInT): Promise<AxiosResponse> => api.post('/login', payload)
export const checkAuth = (): Promise<AxiosResponse> => api.get('/authorized')
