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

export interface UserExtendT extends UserT {
  password: string
}

export type SignUpT = Omit<UserExtendT, '_id'>

export type FetchStatusT = 'idle' | 'loading' | 'success' | 'error'

export type CurrentUser = UserT | null

export type ErrorT = string | null

export interface InitialUserState {
  currentUser: CurrentUser
  fetchStatus: FetchStatusT
  error: ErrorT
}
