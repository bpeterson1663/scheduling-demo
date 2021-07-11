import axios from 'axios'
import { SignInT, UserT } from '../types'

const api = axios.create({
  withCredentials: true,
  baseURL: `http://localhost:4000/api`,
})

export const signIn = (payload: SignInT): Promise<UserT> => api.post('/login', payload)
