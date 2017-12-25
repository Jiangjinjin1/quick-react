import { combineReducers } from 'redux-immutable'

import test from './test'
import routing from './routing'

export default combineReducers({
  test,
  routing
})