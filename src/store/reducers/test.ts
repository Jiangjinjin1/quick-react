import { THISIAATEST } from '../../constants/actions'
import * as Immutable from 'immutable'

const testState = Immutable.fromJS({
  anyState: ''
})

export default function (state = testState, action: { type: string, payload: object }) {
  return {
    anyState: '123'
  }
}