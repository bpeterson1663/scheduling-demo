export interface SignInT {
  email: string
  password: string
}

export interface UserT {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: 'administrator' | 'employee'
  businessName: string
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

export type CurrentUser = UserT | null

export interface InitialUserState {
  currentUser: CurrentUser
  fetchStatus: FetchStatus
  error: string | null
}