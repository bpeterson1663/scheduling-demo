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
  employee: null
  fetchStatus: FetchStatusT
  message: MessageT
}

export interface NewShiftT {
  name: string
  startTime: number
  endTime: number
  userId: string
}

export interface ShiftT extends NewShiftT {
  _id: string
}

export interface DisplayShiftT {
  _id: string
  fullName: string
  startDate: string
  shiftName: string
  startTime: string
  endTime: string
  duration: string
}

export interface InitialShiftState {
  shifts: ShiftT[]
  shift: ShiftT | null
  fetchStatus: FetchStatusT
  message: MessageT
}
