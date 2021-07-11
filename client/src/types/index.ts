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

