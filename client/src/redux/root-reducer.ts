import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import employeeReducer from './employee/employee.reducer'
const rootReducer = combineReducers({
  userReducer,
  employeeReducer,
})

export default rootReducer
