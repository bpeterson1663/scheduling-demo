export interface SignInT {
  email: string
  password: string
}

export type RoleT = 'administrator' | 'employee'

export interface UserT {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: RoleT
  businessName: string
}

export interface UserExtendT extends UserT {
  password: string
}

export type SignUpT = Omit<UserExtendT, '_id'>

export type EmployeeT = Omit<SignUpT, 'businessName'>

export type FetchStatusT = 'idle' | 'loading' | 'success' | 'error'

export type CurrentUser = UserT | null

export type MessageT = string | null

export interface InitialUserState {
  currentUser: CurrentUser
  fetchStatus: FetchStatusT
  message: MessageT
}

export interface InitialEmployeeState {
  employees: UserT[]
  fetchStatus: FetchStatusT
  message: MessageT
}
