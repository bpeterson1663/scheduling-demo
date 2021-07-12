import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import employeeReducer from './employee/employee.reducer'
import shiftReducer from './shift/shift.reducer'

const rootReducer = combineReducers({
  userReducer,
  employeeReducer,
  shiftReducer,
})

export default rootReducer
